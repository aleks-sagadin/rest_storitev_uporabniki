define({ "api": [
  {
    "type": "delete",
    "url": "/users/delete/:id",
    "title": "Brisi uporabnika by id",
    "name": "Brisi_uporabnikaBYID",
    "group": "Delete",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "message",
            "description": "<p>Successfully deleted</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Delete",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/delete/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/GetByPosta/:posta",
    "title": "Pridobi po  posta",
    "name": "Pridobi_uporabnikaBY_Posta",
    "group": "Get",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "posta",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5fd8ba08fbf57e32d8e938a7\",\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n      \"ime\": \"arr\",\n      \"priimek\": \"arr\",\n      \"naslov\": \"arr\",\n      \"posta\": 2000,\n      \"telefon\": 123123213,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Get",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/GetByPosta/:posta"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/GetByTelefon/:telefon",
    "title": "Pridobi po telefonu",
    "name": "Pridobi_uporabnikaBY_telefon",
    "group": "Get",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "telefon",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5fd8ba08fbf57e32d8e938a7\",\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n      \"ime\": \"arr\",\n      \"priimek\": \"arr\",\n      \"naslov\": \"arr\",\n      \"posta\": 2000,\n      \"telefon\": 123123213,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Get",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/GetByTelefon/:telefon"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/GetById/:id",
    "title": "Pridobi po id",
    "name": "Pridobi_uporabnikaById",
    "group": "Get",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "ID",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5fd8ba08fbf57e32d8e938a7\",\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n      \"ime\": \"arr\",\n      \"priimek\": \"arr\",\n      \"naslov\": \"arr\",\n      \"posta\": 2000,\n      \"telefon\": 123123213,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Get",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/GetById/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/all",
    "title": "uporabnke",
    "name": "Pridobi_vse_uporabnike",
    "group": "Get",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uporabnik",
            "optional": false,
            "field": "vrne",
            "description": "<p>vse uporabnike</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Get",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/all"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/add",
    "title": "zaregistracijo",
    "name": "DodajanjeUporabnika",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Username",
            "optional": true,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": true,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Ime",
            "optional": true,
            "field": "ime",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Priimek",
            "optional": true,
            "field": "priimek",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Naslov",
            "optional": true,
            "field": "naslov",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Posta",
            "optional": true,
            "field": "posta",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Telefon",
            "optional": true,
            "field": "telefon",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5fd8ba08fbf57e32d8e938a7\",\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n      \"ime\": \"arr\",\n      \"priimek\": \"arr\",\n      \"naslov\": \"arr\",\n      \"posta\": 2000,\n      \"telefon\": 123123213,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Post",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/add"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/dodajUpp",
    "title": "dodaj Uporabnika",
    "name": "DodajanjeUporabnika",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Username",
            "optional": true,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": true,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Ime",
            "optional": true,
            "field": "ime",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Priimek",
            "optional": true,
            "field": "priimek",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Naslov",
            "optional": true,
            "field": "naslov",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Posta",
            "optional": true,
            "field": "posta",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Telefon",
            "optional": true,
            "field": "telefon",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5fd8ba08fbf57e32d8e938a7\",\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n      \"ime\": \"arr\",\n      \"priimek\": \"arr\",\n      \"naslov\": \"arr\",\n      \"posta\": 2000,\n      \"telefon\": 123123213,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Post",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/dodajUpp"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/signin",
    "title": "/za login",
    "name": "vpis_username/mail_in_geslo",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Post",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/users/signin"
      }
    ]
  },
  {
    "type": "put",
    "url": "/posodobi/:id",
    "title": "/pososdobitev",
    "name": "PosodobitevUporabnika",
    "group": "Put",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Username",
            "optional": true,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": true,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Ime",
            "optional": true,
            "field": "ime",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Priimek",
            "optional": true,
            "field": "priimek",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Naslov",
            "optional": true,
            "field": "naslov",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Posta",
            "optional": true,
            "field": "posta",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Telefon",
            "optional": true,
            "field": "telefon",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5fd8ba08fbf57e32d8e938a7\",\n      \"username\": \"arr\",\n      \"password\": \"arr\",\n      \"ime\": \"arr\",\n      \"priimek\": \"arr\",\n      \"naslov\": \"arr\",\n      \"posta\": 2000,\n      \"telefon\": 123123213,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/uporabniki.js",
    "groupTitle": "Put",
    "sampleRequest": [
      {
        "url": "http://localhost:3001/posodobi/:id"
      }
    ]
  }
] });
