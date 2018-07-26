function main() {
 const windowMinWidth = 886;
  if (window.innerWidth < windowMinWidth) {
    const windowMinWidthError = `Your screen is too tight (${window.innerWidth} px), make it at least ${windowMinWidth} px in width, and refresh the page.`;
    $("#app").append(windowMinWidthError);
    throw Error(windowMinWidthError);
  }

 const logger = new Logger($("#log"));
  logger.log("init");
  const initController = Controller(
    logger
  , new DataStore(localStorage, logger)
  , new Domain()
  , View(UI, logger, $("#app"))
  );
  const plants = {
      "wheat":
      { id: "wheat"
      , name: "Baker's Wheat"
      , mutations:
        [ { parents: [ { id: "wheat", count: 2 } ]
          , propability: .2
          }
        , { parents: [ { id: "corn", count: 2 } ]
          , propability: .05
          }
        ]
      }
    , "corn":
      { id: "corn"
      , name: "Thumbcorn"
      , mutations:
        [ { parents: [ { id: "wheat", count: 2 } ]
          , propability: .05
          }
        , { parents: [ { id: "corn", count: 2 } ]
          , propability: .1
          }
        , { parents: [ { id: "rice", count: 2 } ]
          , propability: .02
          }
        ]
      }
    , "rice":
      { id: "rice"
      , name: "Cronerice"
      , mutations:
        [ { parents: [ { id: "wheat", count: 1 }, { id: "corn", count: 1 } ]
          , propability: .01
          }
        ]
      }
    , "millet":
      { id: "millet"
      , name: "Gildmillet"
      , mutations:
        [ { parents: [ { id: "rice", count: 1 }, { id: "corn", count: 1 } ]
          , propability: .03
          }
        ]
      }
    , "clover":
      { id: "clover"
      , name: "Ordinary Clover"
      , mutations:
        [ { parents: [ { id: "wheat", count: 1 }, { id: "millet", count: 1 } ]
          , propability: .03
          }
        , { parents: [ { id: "clover", count: 1 }, { id: "clover", count: 5, countIf: "<", amateur: true } ]
          , propability: .007
          }
        ]
      }
    , "gclover":
      { id: "gclover"
      , name: "Golden Clover"
      , mutations:
        [ { parents: [ { id: "wheat", count: 1 }, { id: "millet", count: 1 } ]
          , propability: .0007
          }
        , { parents: [ { id: "clover", count: 1 }, { id: "clover", count: 5, countIf: "<", amateur: true } ]
          , propability: .0001
          }
        , { parents: [ { id: "clover", count: 4, countIf: ">=" } ]
          , propability: .0007
          }
        ]
      }
    , "lily":
      { id: "lily"
      , name: "Shimmerlily"
      , mutations:
        [ { parents: [ { id: "clover", count: 1 }, { id: "millet", count: 1 } ]
          , propability: .02
          }
        ]
      }
    , "elder":
      { id: "elder"
      , name: "Elderwort"
      , mutations:
        [ { parents: [ { id: "lily", count: 1 }, { id: "rice", count: 1 } ]
          , propability: .01
          }
        , { parents: [ { id: "wrink", count: 1 }, { id: "rice", count: 1 } ]
          , propability: .002
          }
        ]
      }
    , "berry":
      { id: "berry"
      , name: "Bakeberry"
      , mutations:
        [ { parents: [ { id: "wheat", count: 2 } ]
          , propability: .001
          }
        ]
      }
    , "choco":
      { id: "choco"
      , name: "Chocoroot"
      , mutations:
        [ { parents: [ { id: "wheat", count: 1 }, { id: "mold", count: 1 } ]
          , propability: .1
          }
        ]
      }
    , "wchoco":
      { id: "wchoco"
      , name: "White Chocoroot"
      , mutations:
        [ { parents: [ { id: "choco", count: 1 }, { id: "mildew", count: 1 } ]
          , propability: .1
          }
        ]
      }
    , "weed":
      { id: "weed"
      , name: "Meddleweed"
      , mutations:
        [ { parents: [ { id: "weed", count: 1 }, { id: "weed", count: 3, countIf: "<=", amateur: true } ]
          , propability: .15
          }
        , { parents: [ { id: "any", count: 0 } ]
          , propability: .002
          }
        ]
      }
    , "whisker":
      { id: "whisker"
      , name: "Whiskerbloom"
      , mutations:
        [ { parents: [ { id: "lily", count: 1 }, { id: "wchoko", count: 1 } ]
          , propability: .01
          }
        ]
      }
    , "rose":
      { id: "rose"
      , name: "Chimerose"
      , mutations:
        [ { parents: [ { id: "lily", count: 1 }, { id: "whisker", count: 1 } ]
          , propability: .05
          }
        , { parents: [ { id: "rose", count: 2 } ]
          , propability: .005
          }
        ]
      }
    , "tulip":
      { id: "tulip"
      , name: "Nursetulip"
      , mutations:
        [ { parents: [ { id: "whisker", count: 2 } ]
          , propability: .05
          }
        ]
      }
    , "drow":
      { id: "drow"
      , name: "Drowsyfern"
      , mutations:
        [ { parents: [ { id: "choco", count: 1 }, { id: "moss", count: 1 } ]
          , propability: .005
          }
        ]
      }
    , "lich":
      { id: "lich"
      , name: "Wardlichen"
      , mutations:
        [ { parents: [ { id: "rice", count: 1 }, { id: "moss", count: 1 } ]
          , propability: .005
          }
        , { parents: [ { id: "rice", count: 1 }, { id: "mildew", count: 1 } ]
          , propability: .005
          }
        , { parents: [ { id: "lich", count: 1 }, { id: "lich", count: 0, amateur: true } ]
          , propability: .05
          }
        ]
      }
    , "moss":
      { id: "moss"
      , name: "Keenmoss"
      , mutations:
        [ { parents: [ { id: "rot", count: 1 }, { id: "mold", count: 1 } ]
          , propability: .1
          }
        , { parents: [ { id: "moss", count: 1 }, { id: "moss", count: 0, amateur: true } ]
          , propability: .05
          }
        ]
      }
    , "qb":
      { id: "qb"
      , name: "Queenbeet"
      , mutations:
        [ { parents: [ { id: "berry", count: 1 }, { id: "choco", count: 1 } ]
          , propability: .01
          }
        ]
      }
    , "jqb":
      { id: "jqb"
      , name: "Juicy Queenbeet"
      , mutations:
        [ { parents: [ { id: "qb", count: 8 } ]
          , propability: .001
          }
        ]
      }
    , "duke":
      { id: "duke"
      , name: "Duketater"
      , mutations:
        [ { parents: [ { id: "qb", count: 2 } ]
          , propability: .001
          }
        ]
      }
    , "bulb":
      { id: "bulb"
      , name: "Shriekbulb"
      , mutations:
        [ { parents: [ { id: "wrink", count: 1 }, { id: "elder", count: 1 } ]
          , propability: .001
          }
        , { parents: [ { id: "elder", count: 5 } ]
          , propability: .001
          }
        , { parents: [ { id: "duke", count: 3 } ]
          , propability: .005
          }
        , { parents: [ { id: "room", count: 4 } ]
          , propability: .002
          }
        , { parents: [ { id: "qb", count: 5 } ]
          , propability: .001
          }
        , { parents: [ { id: "bulb", count: 1, amateur: true }, { id: "bulb", count: 0, amateur: true } ]
          , propability: .005
          }
        ]
      }
    , "grass":
      { id: "grass"
      , name: "Tidygrass"
      , mutations:
        [ { parents: [ { id: "wheat", count: 1 }, { id: "wchoco", count: 1 } ]
          , propability: .002
          }
        ]
      }
    , "daisy":
      { id: "daisy"
      , name: "Everdaisy"
      , mutations:
        [ { parents: [ { id: "grass", count: 3 }, { id: "elder", count: 3 } ]
          , propability: .002
          }
        ]
      }
    , "mildew":
      { id: "mildew"
      , name: "White Mildew"
      , mutations:
        [ { parents: [ { id: "mold", count: 1 }, { id: "mildew", count: 1, countIf: "<=" } ]
          , propability: .5
          }
        ]
      }
    , "mold":
      { id: "mold"
      , name: "Brown Mold"
      , mutations:
        [ { parents: [ { id: "mildew", count: 1 }, { id: "mold", count: 1, countIf: "<=" } ]
          , propability: .5
          }
        , { parents: [ { id: "weed", count: 1, duringHarvest: true } ]
          , propability: .002
          , propabilityMultiplicator: "age"
          , propabilityMax: .198
          }
        ]
      }
    , "spore":
      { id: "spore"
      , name: "Crumbspore"
      , mutations:
        [ { parents: [ { id: "spore", count: 1 }, { id: "spore", count: 0 } ]
          , propability: .07
          }
        , { parents: [ { id: "room", count: 2 } ]
          , propability: .005
          }
        , { parents: [ { id: "weed", count: 1, duringHarvest: true } ]
          , propability: .002
          , propabilityMultiplicator: "age"
          , propabilityMax: .198
          }
        ]
      }
    , "room":
      { id: "room"
      , name: "Doughshroom"
      , mutations:
        [ { parents: [ { id: "spore", count: 2 } ]
          , propability: .005
          }
        , { parents: [ { id: "room", count: 1 }, { id: "room", count: 0, amateur: true } ]
          , propability: .07
          }
        ]
      }
    , "glove":
      { id: "glove"
      , name: "Glovemorel"
      , mutations:
        [ { parents: [ { id: "spore", count: 1 }, { id: "corn", count: 1 } ]
          , propability: .02
          }
        ]
      }
    , "cap":
      { id: "cap"
      , name: "Cheapcap"
      , mutations:
        [ { parents: [ { id: "spore", count: 1 }, { id: "lily", count: 1 } ]
          , propability: .04
          }
        ]
      }
    , "fool":
      { id: "fool"
      , name: "Fool's Bolete"
      , mutations:
        [ { parents: [ { id: "room", count: 1 }, { id: "rot", count: 1 } ]
          , propability: .04
          }
        ]
      }
    , "wrink":
      { id: "wrink"
      , name: "Wrinklegill"
      , mutations:
        [ { parents: [ { id: "spore", count: 1 }, { id: "mold", count: 1 } ]
          , propability: .06
          }
        ]
      }
    , "rot":
      { id: "rot"
      , name: "Green Rot"
      , mutations:
        [ { parents: [ { id: "mildew", count: 1 }, { id: "clover", count: 1 } ]
          , propability: .05
          }
        ]
      }
    , "puff":
      { id: "puff"
      , name: "Ichorpuff"
      , mutations:
        [ { parents: [ { id: "elder", count: 1 }, { id: "spore", count: 1 } ]
          , propability: .002
          }
        ]
      }
  };
  initController(plants);
  logger.log("init done");
}

