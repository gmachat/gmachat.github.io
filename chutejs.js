function chutejs() {
  let _this = this

  //allows user to set new attributes to any number of attributes for an element
  //Used for creation of new elements OVERRIDES previous values.  
  //Best used on newly created elements, if updating, use "addToAttributes"
  this.setNewAttributes = (el, attributeObj) => {
    for (const [attribute, value] of Object.entries(attributeObj)) {
      el.setAttribute(attribute, value)
    }
  }

  //allows user to add any amount of attributes and their values to an element
  //updates and APPENDS these values to the previous values.
  this.addToAttributes = (el, attributeObj) => {
    for (const [attribute, value] of Object.entries(attributeObj)) {
      let attrValue = el.getAttribute(attribute)
      if (attrValue) {
        attrValue = `${attrValue} ${value}`
      }
      el.setAttribute(attribute, attrValue)
    }
  }

  //Creates a new element and applies attributes from the attribute object to the class
  this.createFullElement = (tag, attributeObj) => {
    const newElement = document.createElement(tag)
    this.setNewAttributes(newElement, attributeObj)
    return newElement
  }

  //removes attribute value specified in attributeObj from the given element
  //for instance it will remove a specific class from an element
  this.removeFromAttribute = (el, attributeObj) => {
    for (const [attribute, value] of Object.entries(attributeObj)) {
      let attrValue = el.getAttribute(attribute)
      attrValue = attrValue.replace(value, '').trim()
      el.setAttribute(attribute, attrValue)
    }
  }

//create an HTML node from the string passed in to it
  this.createContentFromString = (string) => {
      const tempContainer = document.createElement("div")
      tempContainer.innerHTML = string
      let node = container.firstChild
      return node
    }

//quick function to prevent bubbling form a type of event and element
  this.preventBubbling = (type, el) => {
    el.addEventListener(type, (e) => e.stopPropagation())
  } 

  //disable the scrollbar, useful for things like modals
  this.disableScrollBar = () =>  {

    document.body.style.overflow = 'hidden';
    document.querySelector('html').scrollTop = window.scrollY;
    }
  
  //enables the scroll 
  this.enableScrollBar = () => {
    document.body.style.overflow = null;
    }


}