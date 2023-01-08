from awsHandler import awsHandler


class deal:
    def __init__(self, Product , Productamount, Budget, DealStatus, RequestedBy):
        self.Product = Product
        self.Productamount = Productamount
        self.Budget = Budget
        self.DealStatus = DealStatus
        self.RequestedBy = RequestedBy
        pass

    #request deal
    def requestDeal(self):
        db = awsHandler()
        return db.requestDeal(self.Product , self.Productamount, self.Budget, self.DealStatus, self.RequestedBy)
        

    

