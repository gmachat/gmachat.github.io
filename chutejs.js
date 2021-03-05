function chutejs() {
let _this = this

//allows user to set new attributes to any number of attributes for an element
//Used for creation of new elements OVERRIDES previous values.  
//Best used on newly created elements, if updating, use "addToAttributes"
this.setNewAttributes = (el, attributeObj) => {
  for(const [attribute, value] of Object.entries(attributeObj)){
    el.setAttribute(attribute, value)
  }
}


//allows user to add any amount of attributes and their values to an element
//updates and APPENDS these values to the previous values.
this.addToAttributes = (el, attributeObj) => {
  for(const [attribute, value] of Object.entries(attributeObj)){
    let attr_value = el.getAttribute(attribute)
    if(attr_value){
      attr_value = `${attr_value} ${value}`
    }
    el.setAttribute(attribute, attr_value)
  }
}







}
