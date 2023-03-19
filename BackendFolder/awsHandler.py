#imports
import pymysql

#create class for database connection
class awsHandler:
    def __init__(self):
        self.db = pymysql.connect(host="analytica.cgzyku0cglrd.ap-northeast-1.rds.amazonaws.com", user = "analytica", password="Mnys!#%&(0")
        self.cursor = self.db.cursor()
        self.cursor.execute("select version()")
        self.data = self.cursor.fetchone()
        sql = "use analyticaDB"
        self.cursor.execute(sql)
        print("Database version : %s " % self.data)
      
    def registerUser(self,name,email,password,CNIC,phoneNumber, usertype):
        sql = "CREATE TABLE IF NOT EXISTS %s (email VARCHAR(255) PRIMARY KEY, name VARCHAR(255),password VARCHAR(255), CNIC VARCHAR(255), phoneNumber VARCHAR(255))" % (usertype)
        self.cursor.execute(sql)
        #check if user already exists
        sql = "SELECT * FROM %s WHERE email = '%s'" % (usertype, email)
        self.cursor.execute(sql)
        result = self.cursor.fetchone()
        if result:
            print("User already exists")
            return "exists"
        #inserting user
        sql = "INSERT INTO %s (name, email, password, CNIC, phoneNumber) VALUES ('%s','%s', '%s', '%s', '%s')" % (usertype, name,email, password, CNIC, phoneNumber)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("User inserted successfully")
        except:
            self.db.rollback()
            print("Error inserting user")
            return "error"
        return "success"
    
    def login(self,email, password, usertype):
        sql = "SELECT * FROM %s WHERE email = '%s' AND password = '%s'" % (usertype, email, password)
        self.cursor.execute(sql)
        result = self.cursor.fetchone()
        if result:
            print("User exists")
            return email
        else:
            print("User does not exist")
            return "failure"

    def requestDeal(self, Product , Productamount, Budget, DealStatus, RequestedBy):
        #create table if it does not exist and RequestBy is foreign key to Seller table
        sql = "CREATE TABLE IF NOT EXISTS Deal (dealID INT AUTO_INCREMENT PRIMARY KEY, Product VARCHAR(255), Productamount INT, Budget INT, DealStatus VARCHAR(255), RequestedBy VARCHAR(255), FOREIGN KEY (RequestedBy) REFERENCES Seller(email))"
        self.cursor.execute(sql)
        #inserting deal
        sql = "INSERT INTO Deal (Product, Productamount, Budget, DealStatus, RequestedBy) VALUES ('%s', '%s', '%s', '%s', '%s')" % (Product, Productamount, Budget, DealStatus, RequestedBy)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Deal inserted successfully")
            return "success"
        except:
            self.db.rollback()
            print("Error inserting deal")
            return "error"
        return "success"

    def makeBid(self, DealID, BidAmount, BidStatus, Bidder):
        #create table if it does not exist and Bidder is foreign key to WholeSeller table and DealID is foreign key to Deal table
        sql = "CREATE TABLE IF NOT EXISTS DealBid (bidID INT AUTO_INCREMENT PRIMARY KEY, DealID INT, BidAmount INT, BidStatus VARCHAR(255), Bidder VARCHAR(255), FOREIGN KEY (Bidder) REFERENCES WholeSeller(email), FOREIGN KEY (DealID) REFERENCES Deal(dealID))"
        self.cursor.execute(sql)
        #check if dealID exists
        sql = "SELECT * FROM Deal WHERE dealID = '%s'" % (DealID)
        self.cursor.execute(sql)
        result = self.cursor.fetchone()
        if not result:
            return "Invalid"
        #inserting bid
        sql = "INSERT INTO DealBid (DealID, BidAmount, BidStatus, Bidder) VALUES ('%s', '%s', '%s', '%s')" % (DealID, BidAmount, BidStatus, Bidder)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Bid inserted successfully")
            return "success"
        except:
            self.db.rollback()
            print("Error inserting bid")
            return "error"
        return "success"

    #get bidid, product,product quantity, BidAmount, BidStatus, Name of Bidder of all bids of all deals that are requested by a specific seller and bidding status is pending
    def getDealBids(self, email):
        sql = "SELECT DealBid.bidID, Deal.Product, Deal.ProductAmount, DealBid.BidAmount, DealBid.BidStatus, WholeSeller.name FROM DealBid INNER JOIN Deal ON DealBid.DealID = Deal.DealID INNER JOIN WholeSeller ON DealBid.Bidder = WholeSeller.email WHERE Deal.RequestedBy = '%s' AND DealBid.BidStatus = 'Pending'" % (email)
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        return results

    #get all  deals with DealStatus open and requested by a specific seller
    def getDeals(self, email):
        sql = "SELECT * FROM Deal WHERE RequestedBy = '%s' AND DealStatus = 'open'" % (email)
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        return results

        
    #get DealId, product, productAmount, Budget, name of requestedBy of all deals that are open for bidding and whole seller has not bid on them
    def getOpenDeals(self, email):
        sql = "SELECT DealId, Product, ProductAmount, Budget, Seller.name FROM Deal INNER JOIN Seller ON Deal.RequestedBy = Seller.email WHERE DealStatus = 'Open' AND DealID NOT IN (SELECT DealID FROM DealBid WHERE Bidder = '%s')" % (email)
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        print(results)
        return results

    #get bidId, product,product amount, bidamount, bidstatus, name of requestedby of all deals that bidder has bid on
    def getBiddedDeals(self, email):
        sql = "SELECT DealBid.bidID, Deal.Product, Deal.ProductAmount, DealBid.BidAmount, DealBid.BidStatus, Seller.name FROM DealBid INNER JOIN Deal ON DealBid.DealID = Deal.DealID INNER JOIN Seller ON Deal.RequestedBy = Seller.email WHERE DealBid.Bidder = '%s'" % (email)
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        return results

    #close the deal and update the deal status to closed
    def closeDeal(self, dealID):
        #check if it is in any dealbid and change status of that bid to cancelled
        sql = "SELECT * FROM DealBid WHERE DealID = '%s'" % (dealID)
        self.cursor.execute(sql)
        result = self.cursor.fetchone()
        if result:
            sql = "UPDATE DealBid SET BidStatus = 'Cancelled' WHERE DealID = '%s'" % (dealID)
            try:
                self.cursor.execute(sql)
                self.db.commit()
                print("Bid cancelled successfully")
            except:
                self.db.rollback()
                print("Error cancelling bid")
        sql = "UPDATE Deal SET DealStatus = 'Closed' WHERE dealID = '%s'" % (dealID)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Deal closed successfully")
            return "success"
        except:
            self.db.rollback()
            print("Error closing deal")
            return "error"
        return "success"

    #accept the bid and update the deal status to closed and update the bid status to accepted
    def acceptBid(self, bidID):
        #check if bidID exists
        sql = "SELECT * FROM DealBid WHERE bidID = '%s'" % (bidID)
        self.cursor.execute(sql)
        result = self.cursor.fetchone()
        if not result:
            return "Invalid"
        #update the deal status to closed
        sql = "UPDATE Deal SET DealStatus = 'Closed' WHERE dealID = '%s'" % (result[1])
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Deal closed successfully")
        except:
            self.db.rollback()
            print("Error closing deal")
        #update the bid status of all other bids of that deal to cancelled
        sql = "UPDATE DealBid SET BidStatus = 'Cancelled' WHERE DealID = '%s' AND bidID != '%s'" % (result[1], bidID)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Bid cancelled successfully")
        except:
            self.db.rollback()
            print("Error cancelling bid")
        #update the bid status to accepted
        sql = "UPDATE DealBid SET BidStatus = 'Accepted' WHERE bidID = '%s'" % (bidID)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Bid accepted successfully")
            return "success"
        except:
            self.db.rollback()
            print("Error accepting bid")
            return "error"
        return "success"

    #get the product, product amount,bidamount, name of bidder, email of bidder, phone number of bidder of all bids that are accepted
    def getAcceptedBids(self, email):
        sql = "SELECT Deal.Product, Deal.ProductAmount, DealBid.BidAmount, WholeSeller.name, WholeSeller.email, WholeSeller.phoneNumber FROM DealBid INNER JOIN Deal ON DealBid.DealID = Deal.DealID INNER JOIN WholeSeller ON DealBid.Bidder = WholeSeller.email WHERE Deal.RequestedBy = '%s' AND DealBid.BidStatus = 'Accepted'" % (email)
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        print(results)
        return results
    
    #reject the bid and update the bid status to rejected
    def rejectBid(self, bidID):
        sql = "UPDATE DealBid SET BidStatus = 'Rejected' WHERE bidID = '%s'" % (bidID)
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print("Bid rejected successfully")
            return "success"
        except:
            self.db.rollback()
            print("Error rejecting bid")
            return "error"
        return "success"
    
    #get the product, product amount, bidamount, name of requestedby, email of requestedby, phone number of requestedby of all bids that are accepted
    def getConfirmedBids(self, email):
        sql = "SELECT Deal.Product, Deal.ProductAmount, DealBid.BidAmount, Seller.name, Seller.email, Seller.phoneNumber FROM DealBid INNER JOIN Deal ON DealBid.DealID = Deal.DealID INNER JOIN Seller ON Deal.RequestedBy = Seller.email WHERE DealBid.Bidder = '%s' AND DealBid.BidStatus = 'Accepted'" % (email)
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        return results
        

if __name__ == "__main__":
    db=awsHandler()
    # db.registerUser("ali","ali@gmail.com","123","12345","123","Seller")
    db.getOpenDeals("saim@gmail.com")