# Mongo Document Schema

- [Mongo Document Schema](#mongo-document-schema)
  - [1. Area](#1-area)
  - [2. Article](#2-article)
  - [3. User](#3-user)
  - [4. Shipping](#4-shipping)
  - [5. Comment](#5-comment)

---

## 1. Area

```json
{
    "_id" : ObjectId("67743db1e1ddd426cc4f38f3"),
    "name" : "españistán",
    "country" : "República Bananera de Españistán",
    "locale" : "es-ES",
    "currency" : "psta",
    "dateFormat" : "dd/mm/yyyy",
    "gen" : false
}
```

## 2. Article

```json
{
    "_id" : ObjectId("677404a517ab95953ad02837"),
    "tags" : [
        "numeric",
        "order",
        "courtroom"
    ],
    "materials" : {
        "cotton" : NumberInt(54),
        "nylon" : NumberInt(1)
    },
    "instructs" : {
        "whasing" : "schedule",
        "ironning" : "fledgling",
        "spinning" : "milestone",
        "dryCleaning" : "conservative"
    },
    "discolor" : false,
    "articleVariantList" : [
        {
            "name" : "rojo",
            "sizes" : {
                "xs" : NumberInt(51),
                "s" : NumberInt(20),
                "m" : NumberInt(10),
                "l" : NumberInt(23),
                "xl" : NumberInt(42)
            }
        },
        {
            "name" : "violeta",
            "sizes" : {
                "xs" : NumberInt(10),
                "s" : NumberInt(49),
                "m" : NumberInt(62),
                "l" : NumberInt(75),
                "xl" : NumberInt(40)
            }
        }
    ],
    "pictureList" : [
        {
            "id" : "01JGEK49HYH094KS11WTHPKV3Y",
            "ext" : "peior",
            "src" : "vulticulus",
            "alt" : "tabella"
        },
        {
            "id" : "01JGEK49HY9C3DFXD95FWZ7GCW",
            "ext" : "vestigium",
            "src" : "tumultus",
            "alt" : "uredo"
        }
    ],
    "articleAreaList" : [
        {
            "id" : "01JGEK49HWVBXXEMG06M3Z56RX",
            "title" : "cunctatio creator bellicus",
            "desc" : "Patria xiphias ager canonicus. Triduana conculco quaerat dolores terreo aegrotatio bibo depulso tempore. Voluptatibus voluntarius crastinus.",
            "variantList" : {
                "rojo" : "carcer",
                "violeta" : "viridis"
            },
            "price" : 301.19,
            "tax" : NumberInt(93),
            "area" : "spanish"
        },
        {
            "id" : "01JGEK49HXKDQWXGB7X23M3ZKQ",
            "title" : "dedecor tremo adduco",
            "desc" : "Ademptio thorax volup turba dapifer thorax creptio. Sophismata aliqua celer adeo. Adhuc vallum texo valens ipsam ante aer placeat perferendis.",
            "variantList" : {
                "rojo" : "celo",
                "violeta" : "cubicularis"
            },
            "price" : 793.49,
            "tax" : NumberInt(22),
            "area" : "english-uk"
        }
    ]
}
```

## 3. User

```json
{
    "_id" : ObjectId("67740730a877451c2714a7bb"),
    "userName" : "Jennifer.Prosacco57",
    "pass" : "hJsmkygDzBeW0tb",
    "salt" : "D3uRjTTV1CAGDyr",
    "email" : "Gussie.Becker-Schaefer25@gmail.com",
    "bday" : ISODate("1974-10-31T08:47:24.196+0000"),
    "sex" : "female",
    "area" : "spanish",
    "measures" : {
        "shoulder" : NumberInt(41),
        "chest" : NumberInt(97),
        "waist" : NumberInt(70),
        "hips" : NumberInt(103),
        "foot" : NumberInt(40),
        "height" : NumberInt(167),
        "weight" : NumberInt(67),
        "unitsHeight" : "cm",
        "unitsWeight" : "kg"
    },
    "addressList" : [
        {
            "id" : "01JGEKR5MDXBG56SD1E3JY00E6",
            "alias" : "vestrum viriliter solus",
            "name" : "Nico",
            "surname" : "Lowe",
            "address" : "East",
            "city" : "Chino Hills",
            "state" : "Minnesota",
            "country" : "Bosnia and Herzegovina",
            "phone" : "785-329-3791 x11483",
            "obs" : "Cognomen est pauci. Tricesimus adeptio adsum verecundia verecundia admiratio volutabrum. A sum vulariter ut caritas cibo."
        },
        {
            "id" : "01JGEKR5MDZ9XE4Z5AZDWGHQQR",
            "alias" : "voro spes strues",
            "name" : "Monte",
            "surname" : "Schowalter",
            "address" : "Southeast",
            "city" : "Lubbock",
            "state" : "Louisiana",
            "country" : "Dominican Republic",
            "phone" : "395-304-8102",
            "obs" : "Cupiditate quam quis cuppedia ara dedecor caries certus. Amor trepide arguo dolores vicinus. Sint cunctatio aeger crudelis quas ago nulla repudiandae quibusdam avarus."
        }
    ],
    "favList" : [
        ObjectId("67740730a877451c2714a7b3"),
        ObjectId("67740730a877451c2714a7b4"),
        ObjectId("67740730a877451c2714a7b5"),
        ObjectId("67740730a877451c2714a7b6")
    ],
    "cart" : {
        "id" : "01JGEKR5MDWCCGNFYY61TADV4G",
        "cartLineList" : [
            {
                "order" : "01JGEKR5MDX1JPT2JB6CDBZN6S",
                "qty" : 410853549465197.0,
                "article" : ObjectId("67740730a877451c2714a7b3")
            },
            {
                "order" : "01JGEKR5MDDC5BHVWXBAXKFWQV",
                "qty" : 7452064497516803.0,
                "article" : ObjectId("67740730a877451c2714a7b4")
            }
        ]
    },
    "shippingList" : [
        ObjectId("67740730a877451c2714a7b7"),
        ObjectId("67740730a877451c2714a7b8"),
        ObjectId("67740730a877451c2714a7b9"),
        ObjectId("67740730a877451c2714a7ba")
    ]
}
```

## 4. Shipping

```json
{
    "_id" : ObjectId("67740730a877451c2714a7b7"),
    "idTracking" : "1",
    "state" : {

    },
    "idPayment" : "0",
    "payment" : "card",
    "shippingLineList" : [
        {
            "order" : "01JGEKR5MB5ZMSS49QN7NT7BPF",
            "qty" : 5524090817719203.0,
            "article" : ObjectId("67740730a877451c2714a7b3")
        },
        {
            "order" : "01JGEKR5MB9VVSPTPZMAQ8JAJG",
            "qty" : 1496975754981676.0,
            "article" : ObjectId("67740730a877451c2714a7b4")
        },
        {
            "order" : "01JGEKR5MB0PP31EA81K37GASJ",
            "qty" : 4145402004304380.0,
            "article" : ObjectId("67740730a877451c2714a7b5")
        },
        {
            "order" : "01JGEKR5MBWBY2AX46FYZVXYN0",
            "qty" : 5497326505001865.0,
            "article" : ObjectId("67740730a877451c2714a7b6")
        }
    ]
}
```

## 5. Comment

```json
{
    "_id" : ObjectId("67740730a877451c2714a7bc"),
    "title" : "damno",
    "body" : "Optio tamdiu vesica textor sodalitas coadunatio patior tripudio. Adeptio volva cotidie tamdiu degero articulus. Patior vociferor tergiversatio arbor aveho vinum.",
    "rating" : NumberInt(5),
    "pictureList" : [
        {
            "id" : "01JGEKR5MEAQDR0VDSR734PGW1",
            "ext" : "ager",
            "src" : "sulum",
            "alt" : "curto"
        },
        {
            "id" : "01JGEKR5MEDQJMGA14638SJF7E",
            "ext" : "congregatio",
            "src" : "terreo",
            "alt" : "casus"
        },
        {
            "id" : "01JGEKR5MEGNCV4FBQ8D7E15V8",
            "ext" : "aequus",
            "src" : "teres",
            "alt" : "utor"
        }
    ],
    "idArticle" : ObjectId("67740730a877451c2714a7b3"),
    "idUser" : "Jennifer.Prosacco57"
}
```
