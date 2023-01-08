
from Deal import deal
from DealList import DealList
from Person import Person

class Wholeseller():
    def __init__(self, email,name,password, DOB,CNIC,phoneNumber):
        self.ID = id
        self.Deallist=DealList()
        Person.__init__(self, name,email,password, DOB,phoneNumber,CNIC)
        pass


    def proposeDeal(self, d):
        self.Deallist.proposeDeal(self, d)
        pass

    def getDeals(self):
        self.Deallist.getDeals()



