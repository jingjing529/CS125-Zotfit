import pymysql

conn_params = {
    'host': 'localhost',
    'user': YOURMYSQLUSER,
    'password': YOURMYSQLPASSWORD, 
    'db': 'menu_items',
    'charset': 'utf8mb4',
    'local_infile': 1
}

connection = pymysql.connect(**conn_params)

try:
    with connection.cursor() as cursor:
        with open(LOCATIONTO menu_items.txt, 'r') as file:
            next(file)  
            for line in file:
                parts = line.strip().split(',')  
                name = parts[0].strip('"')  
                calories = parts[1].strip().strip('"')  
                meal_type = parts[2].strip().strip('"')  
                sql = "INSERT INTO food (name, calories, meal_type) VALUES (%s, %s, %s)"    
                cursor.execute(sql, (name, calories, meal_type))
    connection.commit()
finally:
    connection.close()
