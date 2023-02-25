from flask import Flask, request, Response
import manager

app = Flask(__name__)

@app.route('/get/<shortlink>', methods=['GET'])
def get_short_link(shortlink : str):
    
    # make call to manager to return longlinks
    
    manager.get_link_from_database(shortlink) 
    
    return 'longlink'
    
    
@app.route('/create', methods=['POST'])
def create_short_link():
    
    link_dictionary = request.get_json()
    
    str_returned =  manager.create_link_in_database(link_dictionary)
    
    if(str_returned == 'ok'):
        return Response("Created the shortlink!", status=200);
    else:
        return Response("Could not create shortlink dumbo!", status=400)


if __name__ == '__main__':
    app.run(debug=True)