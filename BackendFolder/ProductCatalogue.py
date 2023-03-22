#imports
from pmdarima import auto_arima
import csv
import ctypes
import string
import datefinder
import matplotlib
import numpy as np
from dateutil.parser import parse
import pandas as pd
# import parsedatetime
import matplotlib.pyplot as plt
from pmdarima.arima import ADFTest
import requests
import re

class ProductCatalouge:
    def __init__(self):
        self.Mobiles = []
        self.Laptops = []
        self.HomeAppliances = []
        self.FutureMobiles = []
        self.FutureLaptops = []
        self.FutureHomeAppliances = []
        self.LoadDataforAnalysis()
        self.RunForecastModels()

    def LoadDataforAnalysis(self):
        #load data from csv file of each product one by one
        path = "cleaned_Laptops.csv"
        data = pd.read_csv(path)
        data.set_index('Date', inplace=True)
        data.index = pd.to_datetime(data.index)
        result = data.resample('1M').count()
        Temp = result['Prices'].values.tolist()
        print("Laptops",Temp)
        self.Laptops = Temp[-12:]
        #for mobiles
        path = "cleaned_Mobiles.csv"
        data = pd.read_csv(path)
        data.set_index('Date', inplace=True)
        data.index = pd.to_datetime(data.index)
        #total sales counts of each month
        result = data.resample('1M').count()
        Temp = result['Prices'].values.tolist()
        print("Mobiles",Temp)
        self.Mobiles = Temp[-12:]
        #for home appliances
        path = "cleaned_Home Appliances.csv"
        data = pd.read_csv(path)
        data.set_index('Date', inplace=True)
        data.index = pd.to_datetime(data.index)
        result = data.resample('1M').count()
        Temp = result['Prices'].values.tolist()
        print("Home Appliances",Temp)
        self.HomeAppliances = Temp[-12:]
        return 1

    def RunForecastModels(self):
        # run forecast models for each product
        #for mobiles
        self.FutureMobiles = self.getforecast("Mobiles")
        #for laptops
        self.FutureLaptops = self.getforecast("Laptops")
        #for home appliances
        self.FutureHomeAppliances = self.getforecast("Home Appliances")
        return 1

    def getSalesInsights(self, productname):
        pricelist = []
        responsedata={}
        labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        if productname == "Mobiles":
            pricelist = self.Mobiles
            pricelist = pricelist[-9:]
        elif productname == "Laptops":
            pricelist = self.Laptops
            pricelist = pricelist[-9:]
        elif productname == "Home Appliances":
            pricelist = self.HomeAppliances
            pricelist = pricelist[-9:]
        datasets = {"label": productname, "data": pricelist}
        responsedata = {"labels": labels, "datasets": datasets}
        return responsedata

    def getforecast(self, productname):
        pricelist = []
        if productname != None:
            if productname == "Mobiles":
                pricelist = self.Mobiles
                pricelist = pricelist[-12:]
            elif productname == "Laptops":
                pricelist = self.Laptops
                pricelist = pricelist[-12:]
            elif productname == "Home Appliances":
                pricelist = self.HomeAppliances
                pricelist = pricelist[-12:]
            data = pd.DataFrame(pricelist, columns=['Monthly Prices'])
            # predict next month sale based on previous 12 months data using auto arima model
            model = auto_arima(data, start_p=1, start_q=1,
                               test='adf',
                               max_p=3, max_q=3, m=12,
                               start_P=0, seasonal=False,
                               d=1, D=1, trace=True,
                               error_action='ignore',
                               suppress_warnings=True,
                               stepwise=True)
            model.fit(data)
            future_forecast = model.predict(n_periods=9)
            #print(future_forecast)
            prediction = pd.DataFrame(future_forecast, columns=['Prediction'])
            pricelist.pop(0)
            pricelist.append(int(prediction["Prediction"].iloc[0]))
            pricelist=pricelist[-9:]
            #append first value of future forecast to pricelist
            print(pricelist)
            return pricelist

    def getSalesforecast(self, productname):
        pricelist = []
        if productname != None:
            if productname == "Mobiles":
                pricelist = self.FutureMobiles
            elif productname == "Laptops":
                pricelist = self.FutureLaptops
            elif productname == "Home Appliances":
                pricelist = self.FutureHomeAppliances
        responsedata={}
        labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
        datasets = {"label": productname, "data": pricelist}
        responsedata = {"labels": labels, "datasets": datasets}
        return responsedata

    def dashboardstats(self, productname):
        data=[]
        temp=[]
        temp2=[]
        if productname == "Mobiles":
            temp = self.Mobiles
            temp2=self.FutureMobiles
        elif productname == "Laptops":
            temp = self.Laptops
            temp2=self.FutureLaptops
        elif productname == "Home Appliances":
            temp = self.HomeAppliances
            temp2=self.FutureHomeAppliances
        # percentage of sales of last month with respect to current month
        if temp[-2]<temp[-1]:
            data.append(round((temp[-2] / temp[-1]) * 100*(-1), 2))
        else:
            data.append(round((temp[-2] / temp[-1]) * 100, 2))
        # percentage of sales of current month with respect to last month
        if temp[-1]<temp[-2]:
            data.append(round((temp[-1] / temp[-2]) * 100 *(-1), 2))
        else:
            data.append(round((temp[-1] / temp[-2]) * 100, 2))
        # percentage of sales of next month with respect to current month
        if temp2[-1]<temp[-1]:
            data.append(round((temp2[-1] / temp[-1]) * 100*(-1), 2))
        else:
            data.append(round((temp2[-1] / temp[-1]) * 100, 2))
        return data

    def getOptimalUtilization(self):
        response={}
        labels= ["Mobiles","Laptops","Appliances"]
        data=[self.FutureMobiles[-1],self.FutureLaptops[-1],self.FutureHomeAppliances[-1]]
        datasets={"label":"Sales","data":data}
        response={"labels":labels,"datasets":datasets}
        return response

    def getBestProduct(self):
        # product having highest sales in next month
        product = "The best product is to invest in is "
        if self.FutureMobiles[-1] > self.FutureLaptops[-1] and self.FutureMobiles[-1] > self.FutureHomeAppliances[-1]:
            product+= "Mobiles."
        elif self.FutureLaptops[-1] > self.FutureMobiles[-1] and self.FutureLaptops[-1] > self.FutureHomeAppliances[-1]:
            product+= "Laptops."
        elif self.FutureHomeAppliances[-1] > self.FutureMobiles[-1] and self.FutureHomeAppliances[-1] > self.FutureLaptops[-1]:
            product+= "Home Appliances."
        return product
    
    # Define a function to scrape the sellers information from a given e-commerce platform
    def getProductSellersListings(self, url, seller_selector):
    # Send a GET request to the e-commerce platform search results page
        response = requests.get(url)
        with open("data.html", "w", encoding="UTF-8") as f:
            f.write(response.text)
        with open("data.html", "r", encoding="UTF-8") as f:
            html_code = f.read()

        pattern = r'sellerName":"([^"]+)"'
        pattern1 = r'ratingScore":"([^"]*)"'
        pattern2 = r'productUrl":"([^"]*)"'

        seller_names = re.findall(pattern, html_code)
        seller_ratings = re.findall(pattern1, html_code)
        product_urls = re.findall(pattern2, html_code)

        # Replace empty ratings with '0'
        seller_ratings = [rating if rating else '0' for rating in seller_ratings]

        # Create a list of tuples containing seller names, ratings, and product URLs
        seller_info = list(zip(seller_names, seller_ratings, product_urls))

        # Sort the seller info list by ratings (highest to lowest)
        sorted_sellers = sorted(seller_info, key=lambda x: x[1], reverse=True)

        # Filter out URLs with 0 ratings
        sorted_sellers = [seller for seller in sorted_sellers if seller[1] != '0']

        return sorted_sellers


    def getSellersList(self,product):
        daraz_url = f"https://www.daraz.pk/catalog/?q={product}"
        daraz_sellers = self.getProductSellersListings(daraz_url, "sellerName")
        return daraz_sellers

