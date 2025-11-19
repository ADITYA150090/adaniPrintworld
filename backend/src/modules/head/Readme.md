{
  "headRoutes": [
    {
      "name": "Dashboard",
      "method": "GET",
      "url": "/api/head/dashboard",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "data": {
          "totalOfficers": 3,
          "pendingLots": 5,
          "unverifiedOfficers": 1
        }
      }
    },
    {
      "name": "Get Verified Officers",
      "method": "GET",
      "url": "/api/head/officers",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "officers": [
          {
            "_id": "691d8181571846de0ccd6b19",
            "name": "Om",
            "email": "om07@gmail.com",
            "number": "9685802076",
            "address": "Prajapati Nagar, Nagpur",
            "tseId": "TSE003",
            "approvedByHead": true,
            "isVerified": true
          }
        ]
      }
    },
    {
      "name": "Get Unverified Officers",
      "method": "GET",
      "url": "/api/head/unverifiedofficers",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "officers": [
          {
            "_id": "691d8181571846de0ccd6b20",
            "name": "Yash",
            "email": "yasha07@gmail.com",
            "number": "9685204463",
            "address": "Nagpur",
            "tseId": "TSE003",
            "approvedByHead": false,
            "isVerified": true
          }
        ]
      }
    },
    {
      "name": "Approve Officer",
      "method": "PATCH",
      "url": "/api/head/officers/:id/approve",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "officer": {
          "_id": "691d8181571846de0ccd6b20",
          "approvedByHead": true
        }
      }
    },
    {
      "name": "Reject Officer",
      "method": "PATCH",
      "url": "/api/head/officers/:id/reject",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "message": "Officer rejected & deleted"
      }
    },
    {
      "name": "Get Unverified Lots",
      "method": "GET",
      "url": "/api/head/lots",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "lots": [
          {
            "_id": "691d9001571846de0ccd6b30",
            "lotNumber": "LOT001",
            "tseId": "TSE003",
            "createdBy": "691d8181571846de0ccd6b19",
            "status": "Pending",
            "isVerified": false
          }
        ]
      }
    },
    {
      "name": "Approve Lot",
      "method": "PATCH",
      "url": "/api/head/lots/:id/approve",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "lot": {
          "_id": "691d9001571846de0ccd6b30",
          "status": "Approved",
          "isVerified": true
        }
      }
    },
    {
      "name": "Reject Lot",
      "method": "PATCH",
      "url": "/api/head/lots/:id/reject",
      "headers": {
        "Authorization": "Bearer <JWT_TOKEN>"
      },
      "requestBody": null,
      "response": {
        "success": true,
        "lot": {
          "_id": "691d9001571846de0ccd6b30",
          "status": "Rejected",
          "isVerified": false
        }
      }
    }
  ]
}
