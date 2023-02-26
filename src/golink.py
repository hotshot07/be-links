from flask import Flask, request, Response, redirect
import csv
import yaml
import time

app = Flask(__name__)

def get_data_from_yaml():
    with open('conf.yaml','r') as yaml_file:
        return yaml.safe_load(yaml_file)
    
def write_to_csv_file(list_to_write):
    with open('analytics.csv','a') as analytics_file:
        writer = csv.writer(analytics_file)
        writer.writerow(list_to_write)
        

@app.route('/get/<shortlink>', methods=['GET'])
def get_short_link(shortlink : str):
    
    longlink = app.config['DATA'].get(shortlink)
    
    if longlink is None:
        return Response('Shortlink not found', status=404)
    else:
        write_to_csv_file([shortlink, round(time.time() * 1000)])
        return redirect(longlink, code=302)
    
if __name__ == '__main__':
    app.config['DATA'] = get_data_from_yaml()
    app.run(debug=True)
    
    