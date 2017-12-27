// function Product(id, description) {
//     this.getId = function () {
//         return id;
//     };
//     this.getDescription = function () {
//         return description;
//     };
// }

// function Cart(eventAggregator) {
//     this.items = [];

//     this.addItem = function (item) {
//         this.items.push(item);
//     };
// }

// (function () {
//     var products = [new Product(1, "iphone X"),
//     new Product(2, 'Samsung S8'),
//     new Product(3, "xiaomi mix2")],
//         cart = new Cart();

//     function addToCart(e) {
//         var productId = this.getAttribute('id');
//         var product = products.filter(item => {
//             return item.getId() == productId;
//         })[0];
//         cart.addItem(product);
//         var newItem = document.createElement('li');
//         newItem.innerHTML = product.getDescription();
//         newItem.setAttribute('id-cart', product.getId());
//         document.querySelector('#cart').appendChild(newItem);
//         this.parentNode.removeChild(this);
//     }

//     products.forEach(function (product) {
//         var newItem = document.createElement('li');
//         newItem.innerHTML = product.getDescription();
//         newItem.setAttribute('id', product.getId());
//         newItem.addEventListener('dblclick', addToCart);
//         document.querySelector('#products').appendChild(newItem);
//     });

// })();

function Event(name) {
    //保存回调函数代码
    var handlers = [];

    //获取事件名称
    this.getName = function () {
        return name;
    };
    //添加回调函数
    this.addHandler = function (handler) {
        handlers.push(handler);
    };
    //删除回调函数
    this.removeHandler = function (handler) {
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    };
    //传入参数，执行所有回调函数
    this.fire = function (eventArgs) {
        handlers.forEach(h => {
            h(eventArgs);
        });
    };
}
//实现事件的订阅与发布（绑定和执行）
function EventAggregator() {
    var events = [];

    function getEvent(eventName) {
        return events.filter(event => {
            return event.getName() === eventName;
        })[0];
    }
    //事件的发布
    this.publish = function (eventName, eventArgs) {
        var event = getEvent(eventName);

        if (!event) {
            event = new Event(eventName);
            events.push(event);
        }
        event.fire(eventArgs);
    };
    //事件的订阅
    this.subscribe = function (eventName, handler) {
        var event = getEvent(eventName);
        if (!event) {
            event = new Event(eventName);
            events.push(event);
        }
        event.addHandler(handler);
    };
}

function Product(id, description) {
    this.getId = function () {
        return id;
    };
    this.getDescription = function () {
        return description;
    };
}

function Cart(eventAggregator) {
    var items = [];
    //添加item时，触发事件itemAdded，并将item作为参数传进去
    this.addItem = function (item) {
        items.push(item);
        eventAggregator.publish("itemAdded", item);
    };
}

function CartController(cart, eventAggregator) {
    //订阅itemAdded事件
    eventAggregator.subscribe('itemAdded', function (eventArgs) {
        var newItem = document.createElement('li');
        newItem.innerHTML = eventArgs.getDescription();
        newItem.setAttribute('id-cart', eventArgs.getId());
        document.querySelector('#cart').appendChild(newItem);
    });
    //订阅productSelected事件
    eventAggregator.subscribe('productSelected', function (eventArgs) {
        cart.addItem(eventArgs.product);
    });
}
//获取数据
function ProductRepository() {
    var products = [new Product(1, "iphone X"),
    new Product(2, 'Samsung S8'),
    new Product(3, "xiaomi mix2")];

    this.getProducts = function () {
        return products;
    };
}

function ProductController(eventAggregator, ProductRepository) {
    var products = ProductRepository.getProducts();

    function onProductSelected() {
        var productId = this.getAttribute('id');
        var product = products.filter(item => {
            return item.getId() == productId;
        })[0];
        eventAggregator.publish('productSelected', {
            product: product
        });
    }

    products.forEach(function (product) {
        var newItem = document.createElement('li');
        newItem.innerHTML = product.getDescription();
        newItem.setAttribute('id', product.getId());
        //双击后触发productSelected事件
        newItem.addEventListener('dblclick', onProductSelected);
        document.querySelector('#products').appendChild(newItem);
    });
}

(function () {
    var eventAggregator = new EventAggregator(),
        cart = new Cart(eventAggregator),
        cartController = new CartController(cart, eventAggregator),
        productRepository = new ProductRepository(),
        productController = new ProductController(eventAggregator, productRepository);
})();
