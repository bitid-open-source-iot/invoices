var invoices = db.getCollection("tblInvoices");
if (invoices.count() == 0) {
    db.tblInvoices.insert({
        "bitid": {
            "auth": {
                "users": [
                    {
                        "role":     5,
                        "email":    "xxx@xxx.co.za"
                    }
                ],
                "organizationOnly": 1
            }
        },
        "date": {
            "paid":         ISODate(),
            "initialized":  ISODate()
        },
        "items": [
            {
                "tax":          15,
                "icon":         "xxx",
                "itemId":       "000000000000000000000001",
                "amount":       10,
                "quantity":     1,
                "description":  "xxx"
            }
        ],
        "payment": {
            "id":       "",
            "token":    "",
            "gateway":  "payfast"
        },
        "recipient": {
            "reg":          "",
            "vat":          "",
            "type":         "business",
            "name":         "",
            "street":       "",
            "suburb":       "",
            "country":      "",
            "townCity":     "",
            "postalCode":   ""
        },
        "_id":          ObjectId("000000000000000000000001"),
        "appId":        ["xxx"],
        "title":        "xxx",
        "description":  "xxx"
    });
};