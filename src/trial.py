import argparse
import ast
from dominate.tags import *
from dominate.util import text
from google.cloud import vision
import google.cloud as cl
import io
import os
from PIL import Image
import gevent
import gevent.monkey
from autocorrect import Speller
gevent.monkey.patch_socket()



parser = argparse.ArgumentParser(description="ImageToHTML")
parser.add_argument("-c", "--certificate", help="Path to the folder where the certificate for Google OCR stored", type=str)
parser.add_argument("-i", "--inputImage", help="Path to the folder where the input image is stored", type=str)
parser.add_argument("-r", "--result", help="Data about table detection", type=str)
args = parser.parse_args()
credential_path = args.certificate  # Certificate filename to be change for Google vision
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path  # Configuration to use Google vision
client = vision.ImageAnnotatorClient()

def detect_text(x1, y1, x2, y2):  # crop and pass image to Google Vision for OCR
    image_file = Image.open(args.inputImage).crop((x1, y1, x2, y2))
    # drawn UI image filename of image to be change
    imgByteArr = io.BytesIO()
    image_file.save(imgByteArr, format='PNG')
    imgByteArr = imgByteArr.getvalue()
    content = imgByteArr

    image = vision.types.Image(content=content)
    response = client.text_detection(image=image)
    if response == cl.vision_v1.types.AnnotateImageResponse():
        response = client.logo_detection(image=image)
    return response  # Return text and its coordinates

def process_table_data(table_data):
	column_text = [];
	detected_text = [];
	check = Speller(lang='en')
	image_width, image_height = Image.open(args.inputImage).size;
	if table_data[0]['x2'] <= 1:
		for tab in table_data:
			for row in tab['row']:
				for col in tab['column']:
					detected_text.append(gevent.spawn(detect_text, col['x1'] * image_width, row['y1'] * image_height, col['x2'] * image_width, row['y2'] * image_height))
	else:
		for tab in table_data:
			for row in tab['row']:
				for col in tab['column']:
					detected_text.append(gevent.spawn(detect_text, col['x1'], row['y1'], col['x2'], row['y2']))
	gevent.joinall(detected_text)
	
	for text_i in detected_text:
		if text_i.value is None or text_i.value == cl.vision_v1.types.AnnotateImageResponse() or len(text_i.value.text_annotations) == 0:
			column_text.append('')
		else:
			column_text.append(text_i.value.text_annotations[0].description.encode('utf-8'))
	
	
	for i,text in enumerate(column_text):
		if isinstance(text,bytes):
			column_text[i] = str(text,'utf-8')
			
	column_text = [check(text) for text in column_text]
	return column_text
	
def create_table(table_data, div, table_content):
	image_width, image_height = Image.open(args.inputImage).size;
	content_count = 0
	for tab in table_data:
		_table = div.add(table())
		_table['class'] = "table table-hover table-bordered table-responsive"
		if tab['x2'] <= 1:
			_table['style'] = "position: absolute; left: "+str(tab['x1']*image_width)+"px; top: "+str(tab['y1']*image_height)+"px; width: "+str((tab['x2']-tab['x1'])*image_width)+"px; height: "+str((tab['y2']-tab['y1'])*image_height)+"px"
		else:
			_table['style'] = "position: absolute; left: "+str(tab['x1'])+"px; top: "+str(tab['y1'])+"px; width: "+str(tab['x2']-tab['x1'])+"px; height: "+str(tab['y2']-tab['y1'])+"px"
		for row in tab['row']:
			_tr = _table.add(tr())
			for col in tab['column']:
				_td = _tr.add(td(table_content[content_count]))
				content_count += 1
	return
	
	

def start():
	table_content = process_table_data(ast.literal_eval(args.result))
	_div = div(id = 'div0')
	create_table(ast.literal_eval(args.result), _div, table_content)
	with open("D:/node/nodejsproject/src/trial.html", "w", encoding="utf-8") as file:  ##Output filename to be change
		print(str(_div).encode("utf-8"))
		file.write(str(_div))
		print("HTML created!!!")

if __name__ == "__main__":  # Execution starts here
    start()