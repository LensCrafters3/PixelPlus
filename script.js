var container = document.getElementById('carousel')
        var slider = document.getElementById('slider');
        var slides = document.getElementsByClassName('slide').length;
        var buttons = document.getElementsByClassName('carousel-button');


        var currentPosition = 0;
        var currentMargin = 0;
        var slidesPerPage = 0;
        var slidesCount = slides - slidesPerPage;
        var containerWidth = container.offsetWidth;
        var prevKeyActive = false;
        var nextKeyActive = true;

        window.addEventListener("resize", checkWidth);

        function checkWidth() {
            containerWidth = container.offsetWidth;
            setParams(containerWidth);
        }

        function setParams(w) {
            if (w < 551) {
                slidesPerPage = 1;
            } else {
                if (w < 901) {
                    slidesPerPage = 2;
                } else {
                    if (w < 1101) {
                        slidesPerPage = 3;
                    } else {
                        slidesPerPage = 4;
                    }
                }
            }
            slidesCount = slides - slidesPerPage;
            if (currentPosition > slidesCount) {
                currentPosition -= slidesPerPage;
            };
            currentMargin = - currentPosition * (100 / slidesPerPage);
            slider.style.marginLeft = currentMargin + '%';
            if (currentPosition > 0) {
                buttons[0].classList.remove('inactive');
            }
            if (currentPosition < slidesCount) {
                buttons[1].classList.remove('inactive');
            }
            if (currentPosition >= slidesCount) {
                buttons[1].classList.add('inactive');
            }
        }

        setParams();

        function slideBack() {
            if (currentPosition != 0) {
                slider.style.marginLeft = currentMargin + (100 / slidesPerPage) + '%';
                currentMargin += (100 / slidesPerPage);
                currentPosition--;
            };
            if (currentPosition === 0) {
                buttons[0].classList.add('inactive');
            }
            if (currentPosition < slidesCount) {
                buttons[1].classList.remove('inactive');
            }
        };

        function slideNext() {
            if (currentPosition != slidesCount) {
                slider.style.marginLeft = currentMargin - (100 / slidesPerPage) + '%';
                currentMargin -= (100 / slidesPerPage);
                currentPosition++;
            };
            if (currentPosition == slidesCount) {
                buttons[1].classList.add('inactive');
            }
            if (currentPosition > 0) {
                buttons[0].classList.remove('inactive');
            }
        };

    
var openWindowButtons = document.querySelectorAll('[data-target-button]');
var closeWindowButtons = document.querySelectorAll('[data-close-button]');
var overlay = document.getElementById('overlay')

openWindowButtons.forEach(button => {
    button.addEventListener('click', () =>{
        var window = document.querySelector(button.dataset.targetButton)
        openWindow(window)
    })
})

overlay.addEventListener('click', () => {
    var windows = document.querySelectorAll('.window .active')
    window.forEach(window => {
        closeWindow(window)
    })
})

closeWindowButtons.forEach(button => {
    button.addEventListener('click', () =>{
        var window = button.closest('.window')
        closeWindow(window)
    })
})

function openWindow(window){
    if (window == null) return
    window.classList.add('active')
    overlay.classList.add('active')
}

function closeWindow(window){
    if (window == null) return
    window.classList.remove('active')
    overlay.classList.remove('active')
}

function addToCart(id, image, name, price) {
    /* get product info store in array */
    let items = [id, image, name, price];

    /* get data from localstorage */
    let from_store = localStorage.getItem("shopping-cart");

    /* if localstore is not null 
    The ternary operator is a conditional operator which evaluates either of two expressions 
    – a true expression and a false expression
     – based on a conditional expression that you provide.

     syntax
     condition ? trueExpression : falseExpression
     condition == from_store
     ifTrue == JSON.parse(from_store)
     ifFalse == [] 
     assign whatever result to tmp variable
    */
    let tmp = from_store ? JSON.parse(from_store) : [];

    /* add new array to current array */
    tmp.push(items);

    console.log(tmp);

    /* assign to localstorage */
    localStorage.setItem("shopping-cart", JSON.stringify(tmp));
    /* set alert that item was added to cart */
    alert("Added to Cart");
}


function showCart() {
    /* retrieve from localstorage,save in variable */
    let cart = JSON.parse(localStorage.getItem("shopping-cart"));
    /* empty variable to store formatted items */
    let all_items = "";

    /* use a for loopw to go through the retrieve localstorage array and
    display the items in a formatted way */
    for (var i = 0; i < cart.length; i++) {
        all_items +=
            "<div class=\"listing2\"><img src=\""
            + cart[i][1] + "\" style=\"width:150px; padding: 20px;\"><h4 style=\"padding: 20px;\">"
            + cart[i][2] + "</h4><p style=\"padding: 20px;\">"
            + cart[i][3] + "</p>"
            + "<button class=\"remove\" onclick=\"removeItem(" + cart[i][0] + ")\">Remove</button></div>";
        document.getElementById("cart-items").innerHTML = all_items;
    }
}
function removeItem(arg) {
    /* get items from localstorage and save to a locl variable */
    let cart = JSON.parse(localStorage.getItem("shopping-cart"));
    /* create a blank variable that will store new, filtered array */
    let filteredUsers = [];

    for (let i = 0; i < cart.length; i++) {
        /* if the id of the item in the cart is not the same as the item we are looking for
        which is whatever the value of arg is then we add that item to the new filtered array */
        if (cart[i][0] != arg) {
            filteredUsers = [...filteredUsers, cart[i]];
        }
    }
    /* add the new filtered array to the localstorage */
    localStorage.setItem("shopping-cart", JSON.stringify(filteredUsers));
    /* reload the page to show new cart items */
    window.location.reload();
}

document.addEventListener('click', e => {
    const isDropdownButton = e.targtet.matches("[data-dropdown-button]")
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    let activeDropdown
    if (isDropdownButton) {
        activeDropdown = e.target.closest('[data-dropdown]')
        activeDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown-button].active").forEach(dropdown => {
        if (dropdown === activeDropdown) return
        dropdown.classList.remove('active')
    })
})

var backToTopbutton = document.getElementById('back-to-top-btn');

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.scrollY > 327) {
        backToTopbutton.style.display = "block";
    }
    else {
        backToTopbutton.style.display = "none"
    }
}

backToTopbutton.addEventListener("click", backToTop);

function backToTop(){
    window.scrollTo(0, 0);
}
