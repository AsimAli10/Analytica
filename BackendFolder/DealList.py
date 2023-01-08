from Deal import deal
from DealBid import DealBid
from awsHandler import awsHandler


class DealList:
    def __init__(self):
        self.deals = []
        self.dealbids = []

    #request a new deal
    def requestDeal(self, Product , Productamount, Budget, DealStatus, RequestedBy):
        #creating a new deal object
        self.deal = deal(Product , Productamount, Budget, DealStatus, RequestedBy)
        self.deals.append(self.deal)
        #requesting the deal
        return self.deal.requestDeal()
        

    #make a new bid
    def makeBid(self, DealID, BidAmount, BidStatus, Bidder):
        #creating a new bid object
        self.bid = DealBid(DealID, BidAmount, BidStatus, Bidder)
        self.dealbids.append(self.bid)
        #making the bid
        return self.bid.makeBid()
        

    #get all deal bids
    def getDealBids(self, RequestedBy):
        db = awsHandler()
        results = db.getDealBids(RequestedBy)
        return results

    #get all deals for a seller
    def getDeals(self, RequestedBy):
        db = awsHandler()
        results = db.getDeals(RequestedBy)
        return results

    #get all deals that are open for bidding
    def getOpenDeals(self, Bidder):
        db = awsHandler()
        results = db.getOpenDeals(Bidder)
        return results

    #get all deals that bidder has bid on
    def getBiddedDeals(self, Bidder):
        db = awsHandler()
        results = db.getBiddedDeals(Bidder)
        return results
    
    #close the deal
    def closeDeal(self, DealID):
        db = awsHandler()
        return db.closeDeal(DealID)
        
    #accept the bid
    def acceptBid(self, BidID):
        db = awsHandler()
        return db.acceptBid(BidID)

    #get accepted bid
    def getAcceptedBids(self, email):
        db = awsHandler()
        return db.getAcceptedBids(email)
    
    #reject the bid
    def rejectBid(self, BidID):
        db = awsHandler()
        return db.rejectBid(BidID)
    
    #get confirmed bids of a bidder
    def getConfirmedBids(self, Bidder):
        db = awsHandler()
        return db.getConfirmedBids(Bidder)

