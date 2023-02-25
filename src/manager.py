import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database='belink'
)


def get_link_from_database(shortlink):
    
    print(shortlink)
    mycursor = mydb.cursor()
    
    mycursor.execute("SHOW DATABASES")
    
    for x in mycursor:
        print(x)
    
    
    
    # get links from the shortlink table
    # write to timestamp in analytics table  
    
    return None


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
        