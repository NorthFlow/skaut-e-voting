'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ScaleUp = exports.ScaleUp = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transform': 'scale(0.7)',
    'opacity': 0
  },
  end: {
    'transform': 'scale(1)',
    'opacity': 1
  }
};

var SlideFromRight = exports.SlideFromRight = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'cubic-bezier(0.25, 0.5, 0.5, 0.9)'
  },
  begin: {
    'transform': 'translateX(35%)',
    'opacity': 0
  },
  end: {
    'transform': 'translateX(0)',
    'opacity': 1
  }
};

var SlideFromBottom = exports.SlideFromBottom = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transform': 'translateY(35%)',
    'opacity': 0
  },
  end: {
    'transform': 'translateY(0)',
    'opacity': 1
  }
};

var Newspaper = exports.Newspaper = {
  transition: {
    property: 'all',
    duration: 500,
    timingfunction: 'linear'
  },
  begin: {
    'transform': 'scale(0) rotate(720deg)',
    'opacity': 0
  },
  end: {
    'transform': 'scale(1) rotate(0deg)',
    'opacity': 1
  }
};

var Fall = exports.Fall = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'ease-in'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transform': 'translateZ(600px) rotateX(20deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transform': 'translateZ(0px) rotateX(0deg)',
    'opacity': 1
  }
};

var SideFall = exports.SideFall = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transform': 'translate(30%) translateZ(600px) rotate(10deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transform': 'translate(0%) translateZ(0) rotate(0deg)',
    'opacity': 1
  }
};

var FlipHorizontal3D = exports.FlipHorizontal3D = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transform': 'rotateY(-70deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transform': 'rotateY(0deg)',
    'opacity': 1
  }
};

var FlipVertical3D = exports.FlipVertical3D = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transform': 'rotateX(-70deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transform': 'rotateX(0deg)',
    'opacity': 1
  }
};

var Sign3D = exports.Sign3D = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transformOrigin': '50% 0',
    'transform': 'rotateX(-60deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transformOrigin': '50% 0',
    'transform': 'rotateX(0deg)',
    'opacity': 1
  }
};

var SuperScaled = exports.SuperScaled = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transform': 'scale(2)',
    'opacity': 0
  },
  end: {
    'transform': 'scale(1)',
    'opacity': 1
  }
};

var RotateFromBottom3D = exports.RotateFromBottom3D = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'ease-out'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transformOrigin': '0 100%',
    'transform': 'translateY(100%) rotateX(90deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transformOrigin': '0 100%',
    'transform': 'translateY(0%) rotateX(0deg)',
    'opacity': 1
  }
};

var RotateFromLeft3D = exports.RotateFromLeft3D = {
  transition: {
    property: 'all',
    duration: 300,
    timingfunction: 'linear'
  },
  begin: {
    'transformStyle': 'preserve-3d',
    'transformOrigin': '0 100%',
    'transform': 'translateZ(100px) translateX(-30%) rotateY(90deg)',
    'opacity': 0
  },
  end: {
    'transformStyle': 'preserve-3d',
    'transformOrigin': '0 100%',
    'transform': 'translateZ(0px) translateX(0%) rotateY(0deg)',
    'opacity': 1
  }
};