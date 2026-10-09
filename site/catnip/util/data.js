let plant_bbox_data_array = [
  {
    "c1": {
      "x": 0.1452926583591497,
      "y": 0.8918980296873542
    },
    "c2": {
      "x": 0.24362203320827122,
      "y": 0.6218322140822775
    }
  },
  {
    "c1": {
      "x": 0.31700216369269024,
      "y": 0.8805507265106703
    },
    "c2": {
      "x": 0.41679914115150013,
      "y": 0.6150238321762672
    }
  },
  {
    "c1": {
      "x": 0.47110043770997023,
      "y": 0.87374234460466
    },
    "c2": {
      "x": 0.5694298125590918,
      "y": 0.6104849109055936
    }
  },
  {
    "c1": {
      "x": 0.6075874804109896,
      "y": 0.8601255807926393
    },
    "c2": {
      "x": 0.7059168552601112,
      "y": 0.5787124620108787
    }
  },
  {
    "c1": {
      "x": 0.7528801387701394,
      "y": 0.8964369509580278
    },
    "c2": {
      "x": 0.8688207449355214,
      "y": 0.6127543715409304
    }
  },
  {
    "c1": {
      "x": 0.23188121233076417,
      "y": 0.5015508004094282
    },
    "c2": {
      "x": 0.31993736891206703,
      "y": 0.24283228798103537
    }
  },
  {
    "c1": {
      "x": 0.3889146915674209,
      "y": 0.48339511532673396
    },
    "c2": {
      "x": 0.47697084814872376,
      "y": 0.2178682209923308
    }
  },
  {
    "c1": {
      "x": 0.5224665290490635,
      "y": 0.4788561940560604
    },
    "c2": {
      "x": 0.6134578908497431,
      "y": 0.22240714226300437
    }
  },
  {
    "c1": {
      "x": 0.658953571750083,
      "y": 0.4607005089733662
    },
    "c2": {
      "x": 0.751412536160451,
      "y": 0.23375444543968826
    }
  }
]

let plant_base_array = [
  {
    "x": 0.2009109874368418,
    "y": 0.805543118218161
  },
  {
    "x": 0.3737535280994189,
    "y": 0.7752769845802398
  },
  {
    "x": 0.5214821953323908,
    "y": 0.7785613934894346
  },
  {
    "x": 0.6588698558590548,
    "y": 0.7657081667618504
  },
  {
    "x": 0.8169395297983347,
    "y": 0.7926898914905768
  },
  {
    "x": 0.27625260772565746,
    "y": 0.3906339234723015
  },
  {
    "x": 0.431367708320278,
    "y": 0.37692747001713306
  },
  {
    "x": 0.5702326555192716,
    "y": 0.37692747001713306
  },
  {
    "x": 0.7090976027182652,
    "y": 0.3792118789263278
  }
]

let screen_transition_bbox_dictionary_data = {
  "garden": {
    "nightgarden": [
      {
        "c1": {
          "x": 0.4559109327086371,
          "y": 0.06323925337401677
        },
        "c2": {
          "x": 0.5225557202142186,
          "y": 0.007026583708224085
        }
      }
    ],
    "askfloppa": [
      {
        "c1": {
          "x": 0.7709590190986587,
          "y": 0.30214309945363566
        },
        "c2": {
          "x": 0.8678968918340499,
          "y": 0.4403325790487093
        }
      }
    ],
  },

  "nightgarden": {
    "garden": [
      {
        "c1": {
          "x": 0.4559109327086371,
          "y": 0.06323925337401677
        },
        "c2": {
          "x": 0.5225557202142186,
          "y": 0.007026583708224085
        }
      }
    ],
        "moonshot": [
      {
        "c1": {
          "x": 0.8466917321731832,
          "y": 0.13584728502566565
        },
        "c2": {
          "x": 0.8784994716644834,
          "y": 0.18503337098323425
        }
      }
    ],
    "askfloppa": [
      {
        "c1": {
          "x": 0.7709590190986587,
          "y": 0.30214309945363566
        },
        "c2": {
          "x": 0.8678968918340499,
          "y": 0.4403325790487093
        }
      }
    ],
  }
}




let cursorItemPadding = 3;
let cursorItemGridPadding = 10;
let cursorItemWidth = 100;
let cursorItemHeight = 100;
let numCursorItems = 3;

let counterImageCorner = {"x": 10, "y": 120}
let counterImagePadding = 3;
let counterImageWidth = 60;
let counterImageHeight = 60;
let numCounterImages = 4;



let cursorItemBboxArray = []
let counterImageBboxArray = []
let screenTransitionBboxDictionary = {}



function prepareData() {
  prepareCursorItemData();
  prepareScreenTransitionBboxDictionaryData();
  prepareCounterImageData();
}


function prepareCounterImageData() {
  for (let i = 0; i < numCounterImages; i++) {
    let x1 = counterImageCorner.x + counterImagePadding;
    let y1 = counterImageCorner.y + counterImagePadding + (counterImageHeight + counterImagePadding)*i;
    let x2 = x1 + counterImageWidth;
    let y2 = y1 + counterImageHeight;
    let c1 = new Coord(x1, y1);
    let c2 = new Coord(x2, y2);
    counterImageBboxArray.push(new BoundingBox(c1, c2));
  }
}


function prepareScreenTransitionBboxDictionaryData() {
  console.log()
  Object.keys(screen_transition_bbox_dictionary_data).forEach((from) => {
    screenTransitionBboxDictionary[from] = {}
    Object.keys(screen_transition_bbox_dictionary_data[from]).forEach((to) => {
      screenTransitionBboxDictionary[from][to] = [];
      let bboxdata_array = screen_transition_bbox_dictionary_data[from][to];
      bboxdata_array.forEach((bboxdata) => {
        screenTransitionBboxDictionary[from][to].push(new BoundingBox(bboxdata.c1, bboxdata.c2));
      })
    })
  })
}




function prepareCursorItemData() {
  for (let i = 0; i < numCursorItems; i++) {
      let x1 = cursorItemGridPadding + (cursorItemWidth + cursorItemPadding)*i;
      let x2 = x1 + cursorItemWidth;
      let y1 = cursorItemGridPadding ;
      let y2 = y1 + cursorItemHeight;
      let c1 = new Coord(x1, y1);
      let c2 = new Coord(x2, y2);
      cursorItemBboxArray.push(new BoundingBox(c1, c2));
  }
}


prepareData()