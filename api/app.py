import MySQLdb
from flask import Flask, jsonify, g, request, Response
import json
from flaskext.mysql import MySQL

from flask_cors import CORS, cross_origin

mysql = MySQL()
app = Flask(__name__)
CORS(app)
"""cors = CORS(app, resources={
    r"/*":{
        "origins":"*"
    }
})
"""

app.config['SECRET_KEY'] = "mysecretkey"
app.config['CORS_HEADERS'] = 'application/json'

@app.before_request
def db_connect():
    g.conn = MySQLdb.connect(host='localhost',user='root',passwd='Sumanta12345@',db='ticketApp')
    g.cursor = g.conn.cursor()


@app.after_request
def db_disconnect(response):
    g.cursor.close()
    g.conn.close()
    return response


def query_db(query, args=(), one=False):
    g.cursor.execute(query, args)
    rv = [dict((g.cursor.description[idx][0], value)
               for idx, value in enumerate(row)) for row in g.cursor.fetchall()]
    return (rv[0] if rv else None) if one else rv


@app.route("/")
def index():
    return jsonify(response='Hello')


@app.route("/get/tickets")
def getTickets():
    result = query_db("SELECT * FROM tickets")
    data = json.dumps(result)
    resp = Response(data, status=200, mimetype='application/json')
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route("/get/customers")
def getAllCustomer():
    result = query_db("SELECT * FROM customer")
    data = json.dumps(result)
    resp = Response(data, status=200, mimetype='application/json')
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route("/get/ticket/<id>")
@cross_origin()
def getTicket(id):
    sq = "select * from tickets as t inner join customer as c on t.cid=c.customer_id inner join amb_details on t.ambid=amb_details.amb_id inner join vendor_details on t.vid=vendor_details.vendor_id where t.ticket_id='" + id + "';"

    #result = query_db("select * from tickets inner join customer on customer.customer_id=tickets.cid where ticket_id='"+id+"'")
    result = query_db(sq)
    data = json.dumps(result)
    resp = Response(data, status=200, mimetype='application/json')
    #resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp




@app.route("/get/customer/<id>")
@cross_origin()
def getCustomer(id):
    result = query_db("SELECT * FROM customer where customer_id='"+id+"'")
    data = json.dumps(result)
    resp = Response(data, status=200, mimetype='application/json')
    #resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp


@app.route("/add/tickets", methods=['POST'])
def add():
  req_json = request.get_json()
  g.cursor.execute("INSERT INTO tickets (ticket_id, ambid, cid, vid, tis, status, reason, dt) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                   (req_json['tid'], req_json['amb'],req_json['cid'], req_json['vid'], req_json['tis'], req_json['status'],req_json['reason'],req_json['dt']))
  g.conn.commit()
  resp = Response("{'response':'Ticket Generated'}", status=201, mimetype='application/json')
  resp.headers.add("Access-Control-Allow-Origin", "*")
  return resp


@app.route("/add/customer", methods=['POST'])
def addCustomer():
  req_json = request.get_json()
  g.cursor.execute("INSERT INTO customer (fname,contact,customer_id) VALUES (%s,%s,%s)",
                   (req_json['fname'], req_json['contact'], req_json['customer_id']))
  g.conn.commit()
  resp = Response("{'response':'Customer Generated'}", status=201, mimetype='application/json')
  resp.headers.add("Access-Control-Allow-Origin", "*")
  return resp



if __name__ == '__main__':
    app.run('127.0.0.1', 5000, True)
