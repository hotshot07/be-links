import mysql.connector
import time


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database='belink'
)


def get_link_from_database(shortlink:str) -> str:
    
    mycursor = mydb.cursor()
    
    try:
        mycursor.execute(f"SELECT longlink FROM shortlink where `shortlink` = '{shortlink}'")
        longlink = mycursor.fetchall()
        if (len(longlink) == 0):
            return "NotFound"
        
        mycursor.execute(f"INSERT INTO analytics (`shortLink`, `timestamp`) VALUES ('{shortlink}', {int(time.time())});")
        mydb.commit()
        
        return longlink[0][0]
        
    except Exception as e:
        print(e)
        return 'ohno'

# [('https://www.google.com',)] 


def create_link_in_database(link_dictionary : dict) -> str:

    _short_link = str(link_dictionary.get('shortlink'))
    
    _long_link = str(link_dictionary.get('longlink'))
    
    mycursor = mydb.cursor()
    
    try:
        mycursor.execute(f"INSERT INTO shortlink (`shortLink`, `longLink`) VALUES ('{_short_link}', '{_long_link}');")
        mydb.commit()
        return 'ok'
    except Exception as e:
        print(e)
        return 'ohno'
        