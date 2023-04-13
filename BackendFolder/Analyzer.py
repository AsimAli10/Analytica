from DealList import DealList
from UserList import UserList
from ProductCatalogue import ProductCatalouge

class Analyzer:
    def __init__(self):
        self.productcatalouge=ProductCatalouge()
        self.userlist=UserList()
        self.deallist=DealList()
        pass

    """
    # login function
    def login(self, Usernum, username, password):
        # check if the user is already logged in
        return UserList.login(Usernum, username, password)

    # sign up function
    def signup(self, username,password,DOB,email,phoneNumber,CNIC, userType):
        # check if the user is already logged in
        UserList.signup(username,password,DOB,email,phoneNumber,CNIC, userType)
    """
    
    def getSalesInsights(self, productname):
        return self.productcatalouge.getSalesInsights(productname)

    def getSalesforecast(self, productname):
        return self.productcatalouge.getSalesforecast(productname)

    def dashboardstats(self, productname):
        return self.productcatalouge.dashboardstats(productname)

    def getOptimalUtilization(self):
        return self.productcatalouge.getOptimalUtilization()

    def getBestProduct(self):
        return self.productcatalouge.getBestProduct()

    def login(self, userrole, email, password):
        return self.userlist.login(email, password, userrole)

    def signup(self,name,password,email,phoneNumber,CNIC, userType):
        return self.userlist.signup(name,password,email,phoneNumber,CNIC, userType)

    def requestDeal(self, Product , Productamount, Budget, DealStatus, RequestedBy):
        return self.deallist.requestDeal(Product , Productamount, Budget, DealStatus, RequestedBy)

    def makeBid(self, DealID, BidAmount, BidStatus, BidBy):
        return self.deallist.makeBid(DealID, BidAmount, BidStatus, BidBy)

    def getDealBids(self, RequestedBy):
        return self.deallist.getDealBids(RequestedBy)
    
    def getDeals(self, RequestedBy):
        return self.deallist.getDeals(RequestedBy)
    
    def getOpenDeals(self, Bidder):
        return self.deallist.getOpenDeals(Bidder)

    def getBiddedDeals(self, Bidder):
        return self.deallist.getBiddedDeals(Bidder)

    def closeDeal(self, DealID):
        return self.deallist.closeDeal(DealID)

    def acceptBid(self, BidID):
        return self.deallist.acceptBid(BidID)

    def getAcceptedBids(self,requester):
        return self.deallist.getAcceptedBids(requester)

    def rejectBid(self, BidID):
        return self.deallist.rejectBid(BidID)
    
    def getConfirmedBids(self,Bidder):
        return self.deallist.getConfirmedBids(Bidder)
    
    def getSellerListings(self,product):
        return self.productcatalouge.getSellersList(product)
    
    def getProductFeatures(self,product,category):
        return self.productcatalouge.getProductFeatures(product,category)
    
    def getDemographics(self,product):
        return self.productcatalouge.getDemographics(product)