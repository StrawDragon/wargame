import Vector from './vector';

// Which HTML element is the target of the event
function mouseTarget(event) {
  let target = {};
  let myEvent = event;

  if (!myEvent) {
    myEvent = window.event;
  }

  const { target: myTarget, srcElement } = myEvent;

  if (myTarget) {
    target = myTarget;
  } else if (srcElement) {
    target = srcElement;
  }
  if (target.nodeType === 3) {
    // defeat Safari bug
    target = target.parentNode;
  }

  return target;
}

// Mouse position relative to the document
// From http://www.quirksmode.org/js/events_properties.html
function mousePositionDocument(e) {
  let posX = 0;
  let posY = 0;
  let event = e;

  if (!event) {
    const { event: windowEvent } = window;
    event = windowEvent;
  }

  if (event.pageX || event.pageY) {
    posX = event.pageX;
    posY = event.pageY;
  } else if (event.clientX || event.clientY) {
    posX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return new Vector(posX, posY);
}

// Find out where an element is on the page
// From http://www.quirksmode.org/js/findpos.html
function findPosition(target) {
  let currentLeft = 0;
  let currentTop = 0;
  let myTarget = { ...target };

  if (myTarget.offsetParent) {
    do {
      currentLeft += myTarget.offsetLeft;
      currentTop += myTarget.offsetTop;
      myTarget = myTarget.offsetParent;
    } while (myTarget);
  }
  return new Vector(currentLeft, currentTop);
}

// Mouse position relative to the element
// not working on IE7 and below
export default function mousePositionOnElement(e) {
  const mousePosDoc = mousePositionDocument(e);
  const target = mouseTarget(e);
  const targetPosition = findPosition(target);

  targetPosition.sub(mousePosDoc);

  return targetPosition;
}
