1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: The difference is written below:
    getElementById: This is used for calling out an element by an id, which is single and unique.

    getElementsByClassName: Used for calling out an element by an class name, which can be used multiple elements.

    querySelector: To get an specific value or to get an specific target. It will only show the first matching element of an HTML collection. 

2. How do you create and insert a new element into the DOM?
Ans: By adding an new element dynamically.
Ex: const div = document.createElement("div");

3. What is Event Bubbling? And how does it work?
Ans: It is a fundamental concept of DOM and it works like "suppose there an event that gets triggered in the child div/ container, which propagates upward and ends up firing it on all it's parent elements of the DOM tree one by one".

4. What is Event Delegation in JavaScript? Why is it useful?
Ans: We can say it is a part of event Bubbling, as this works because of it. Event Delegation works as a pattern, because in order to handle events in the child elements, a single event listener get attached in the parent div.

It is mainly used for getting clear code for handling logics, to get better performance and to get dynamic elements.

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: 
preventDefault(): For an event, it works to stop the browsers default behavior but doesn't stop the event bubbling. 

stopPropagation(): It works opposite of preventDefault(), as it doesn't stop the browsers default behavior but it stops the event bubbling.