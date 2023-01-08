from awsHandler import awsHandler

class DealBid:
    def __init__(self, DealID, BidAmount, BidStatus, Bidder):
        self.DealID = DealID
        self.BidAmount = BidAmount
        self.BidStatus = BidStatus
        self.Bidder = Bidder
        pass

    #make a new bid
    def makeBid(self):
        db = awsHandler()
        return db.makeBid(self.DealID, self.BidAmount, self.BidStatus, self.Bidder)