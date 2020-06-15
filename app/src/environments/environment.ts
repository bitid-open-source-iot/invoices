export const environment = {
    "api":          "http://127.0.0.1:24000",
    "auth":         "https://auth.bitid.co.za",
    "drive":        "https://drive.bitid.co.za",
    "appId":        "000000000000000000000018",
    "appName":      "Invoices",
    "production":   false,
    "roles": [
        {"value": 1, "title": "Read Only"},
        {"value": 2, "title": "Write Only"},
        {"value": 3, "title": "Read/Write"},
        {"value": 4, "title": "Admin"},
        {"value": 5, "title": "Owner"}
    ],
    "scopes": [
        {"url": "/drive/files/uplaod", "role": 4},
        {"url": "/api/invoices/add", "role": 4},
        {"url": "/api/invoices/get", "role": 4},
        {"url": "/api/invoices/list", "role": 4},
        {"url": "/api/invoices/share", "role": 4},
        {"url": "/api/invoices/update", "role": 4},
        {"url": "/api/invoices/delete", "role": 5},
        {"url": "/api/invoices/notify", "role": 4},
        {"url": "/api/invoices/unsubscribe", "role": 4},
        {"url": "/api/invoices/updatesubscriber", "role": 4},
    ],
    "payfast": {
        "url":          "https://www.payfast.co.za/eng/process",
        "merchantId":   "10626494",
        "cancel_url":   "https://invoices.bitid.co.za/invoices",
        "notify_url":   "https://invoices.bitid.co.za/api/payfast/payment",
        "return_url":   "https://invoices.bitid.co.za/invoices",
        "merchantKey":  "fjugexj8fnkky"
    }
};