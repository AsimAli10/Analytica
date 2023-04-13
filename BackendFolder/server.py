from typing import Iterable, Iterator
from Analyzer import Analyzer
from flask import Flask, request, jsonify, make_response, Response
import flask_cors
import json
app = Flask(__name__)
flask_cors.CORS(app)
cors = flask_cors.CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
analyzer = Analyzer()

#sales insight api
@app.route('/salesinsights', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def salesinsights():
    print("called")
    option=request.json.get('category')
    print(option)
    
    responsedata = analyzer.getSalesInsights(option)
    return {"data": responsedata}

#sales forecast api
@app.route('/salesforecast', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def salesforecast():
    print("called")
    option=request.json.get('category')
    print(option)
    
    responsedata = analyzer.getSalesforecast(option)
    return {"data": responsedata}

#dashboard stats api
@app.route('/dashboardstats', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def dashboardstats():
    print("called")
    option=request.json.get('category')
    responsedata = analyzer.dashboardstats(option)
    return {"data": responsedata}

#optimal utilization api
@app.route('/optimalutilization', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def optimalutilization():
    print("called")
    responsedata = analyzer.getOptimalUtilization()
    return {"data": responsedata}

#best product api
@app.route('/bestproduct', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def bestproduct():
    print("called")
    responsedata = analyzer.getBestProduct()
    return {"data": responsedata}

#login api
@app.route('/login', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def login():
    print("called")
    userrole=request.json.get('userrole')
    email=request.json.get('email')
    password=request.json.get('password')
    print(userrole,email,password)
    responsedata = analyzer.login(userrole,email,password)
    return {"data": responsedata}

#signup api
@app.route('/signup', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def signup():
    print("called")
    name=request.json.get('name')
    password=request.json.get('password')
    email=request.json.get('email')
    phone=request.json.get('phone')
    CNIC=request.json.get('cnic')
    userType=request.json.get('userrole')
    print(name,password,email,phone,CNIC, userType)
    responsedata = analyzer.signup(name,password,email,phone,CNIC, userType)
    return {"data": responsedata}

#request deal api
@app.route('/requestdeal', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def requestdeal():
    print("called")
    product=request.json.get('product')
    productamount=request.json.get('quantity')
    budget=request.json.get('budget')
    dealstatus=request.json.get('dealstatus')
    requestedby=request.json.get('requestBy')
    print(product,productamount,budget,dealstatus,requestedby)
    responsedata = analyzer.requestDeal(product,productamount,budget,dealstatus,requestedby)
    return {"data": responsedata}

#get deals api
@app.route('/getdeals', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getdeals():
    print("called")
    email=request.json.get('email')
    print(email)
    responsedata = analyzer.getDeals(email)
    print(responsedata)
    return {"data": responsedata}

# get deal bids api
@app.route('/getdealbids', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getdealbids():
    print("called")
    email=request.json.get('email')
    print(email)
    responsedata = analyzer.getDealBids(email)
    print(responsedata)
    return {"data": responsedata}

# get open deals
@app.route('/getopendeals', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getopendeals():
    print("called")
    email=request.json.get('email')
    print(email)
    responsedata = analyzer.getOpenDeals(email)
    print(responsedata)
    return {"data": responsedata}

#get Bidded deals
@app.route('/getbiddeddeals', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getbiddeddeals():
    print("called")
    email=request.json.get('email')
    print(email)
    responsedata = analyzer.getBiddedDeals(email)
    print(responsedata)
    return {"data": responsedata}

#make a bid api
@app.route('/makebid', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def makebid():
    print("called")
    email=request.json.get('bidBy')
    dealid=request.json.get('dealid')
    bidamount=request.json.get('bidamount')
    bidstatus=request.json.get('bidstatus')
    print("bidding",email,dealid,bidamount)
    responsedata = analyzer.makeBid(dealid,bidamount,bidstatus,email)
    print(responsedata)
    return {"data": responsedata}

#close deal api
@app.route('/closedeal', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def closedeal():
    print("called")
    dealid=request.json.get('dealid')
    print("closing",dealid)
    responsedata = analyzer.closeDeal(dealid)
    print(responsedata)
    return {"data": responsedata}

#accept bid api
@app.route('/acceptbid', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def acceptbid():
    print("called")
    bidid=request.json.get('bidid')
    print("accepting",bidid)
    responsedata = analyzer.acceptBid(bidid)
    print(responsedata)
    return {"data": responsedata}

#get data of accepted bids
@app.route('/getacceptedbids', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getacceptedbids():
    print("called")
    email=request.json.get('email')
    print(email)
    responsedata = analyzer.getAcceptedBids(email)
    print(responsedata)
    return {"data": responsedata}

#reject a bid
@app.route('/rejectbid', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def rejectbid():
    print("called")
    bidid=request.json.get('bidid')
    print("rejecting",bidid)
    responsedata = analyzer.rejectBid(bidid)
    print(responsedata)
    return {"data": responsedata}

#get confirmed bids of a bidder
@app.route('/getconfirmedbids', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getconfirmedbids():
    print("called")
    email=request.json.get('email')
    print(email)
    responsedata = analyzer.getConfirmedBids(email)
    print(responsedata)
    return {"data": responsedata}

#get sellers listing
@app.route('/getsellerlisting', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getsellerlisting():
    print("called")
    product=request.json.get('product')
    print(product)
    responsedata = analyzer.getSellerListings(product)
    print(responsedata)
    return {"data": responsedata}

#get product features
@app.route('/getproductfeatures', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getproductfeatures():
    print("called")
    product=request.json.get('product')
    category=request.json.get('category')
    print(product)
    responsedata = analyzer.getProductFeatures(product,category)
    print("response",responsedata)
    return {"data": responsedata}

#get demographhics data for a product
@app.route('/getdemographics', methods=['POST', 'GET'])
@flask_cors.cross_origin()
def getdemographics():
    print("called")
    product=request.json.get('product')
    print(product)
    responsedata = analyzer.getDemographics(product)
    print("response",responsedata)
    return {"data": responsedata}


if __name__ == '__main__':
    app.run(debug=True)