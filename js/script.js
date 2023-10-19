$(document).ready(function () {

var medicines = [
    {
        "id" : 1,
        "name" : "Thuốc Vitamin B6 100mg/ml Vinphaco",
        "image" : "sanpham/Vitamin-B6-100mg-ml-Vinphaco-1-350x350.webp",
        "price" : "125,000",
        "type" : "THUỐC"
    },
    {
        "id" : 2,
        "name" : "Enzicoba",
        "image" : "sanpham/Enzincoba1-350x350.webp",
        "price" : "350,000",
        "type" : "THUỐC"
    },
    {
        "id" : 3,
        "name" : "Indocollyre",
        "image" : "sanpham/Indocollyre1-350x350.webp",
        "price" : "155,000",
        "type" : "THUỐC"
    },
    {
        "id" : 4,
        "name" : "Ceralon",
        "image" : "sanpham/Ceralon-1-350x350.webp",
        "price" : "600,000",
        "type" : "THUỐC"
    },
    {
        "id" : 5,
        "name" : "Hutaxon",
        "image" : "sanpham/Hutaxon-1-350x350.webp",
        "price" : "200,000",
        "type" : "THUỐC"
    },
];

var foods = [
    {
        "id" : 1,
        "name" : "Taurine Vita 250mg",
        "image" : "sanpham/taurine-vita-250mg-1-350x350.webp",
        "price" : "285,000",
        "type" : "THỰC PHẨM CHỨC NĂNG"
    },
    {
        "id" : 2,
        "name" : "Lady Balance",
        "image" : "sanpham/Lady-Balance-1-350x350.webp",
        "price" : "250,000",
        "type" : "THỰC PHẨM CHỨC NĂNG"
    },
    {
        "id" : 3,
        "name" : "Trinumax UK Plus",
        "image" : "sanpham/Trinumax-UK-Plus-1-350x350.webp",
        "price" : "140,000",
        "type" : "THỰC PHẨM CHỨC NĂNG"
    },
    {
        "id" : 4,
        "name" : "Kem trị mụn Reenax 10g",
        "image" : "sanpham/reenax-6-350x350.webp",
        "price" : "305,000",
        "type" : "THỰC PHẨM CHỨC NĂNG"
    },
    {
        "id" : 5,
        "name" : "YSPBiotase",
        "image" : "sanpham/ysp-biotase-2_11zon-350x350.webp",
        "price" : "549,000",
        "type" : "THỰC PHẨM CHỨC NĂNG"
    },
]

var carts = [];

getMedicines();
getFoods();
getCarts();

function getMedicines(){
    var elementMedicines = document.querySelectorAll(".medicines");
    var addToCarts = document.querySelectorAll(".cart_medicines");
    var i = 0;
    elementMedicines.forEach(element => {
        element.setAttribute("data-id", medicines[i].id);
        element.setAttribute("data-price", medicines[i].price);
        element.setAttribute("data-type", medicines[i].type);
        i++;
    });

    var j = 0;

    addToCarts.forEach(element => {
        
        if(j < 5)
        {
            element.setAttribute("data-id", medicines[j].id);
            element.setAttribute("data-price", medicines[j].price);
            element.setAttribute("data-img", medicines[j].image);
            element.setAttribute("data-name", medicines[j].name);
            
            j++;
        }

    });
}

function getFoods(){
    var elementFoods = document.querySelectorAll(".foods");
    var addToCarts = document.querySelectorAll(".cart_foods");

    var i = 0;
    var j = 0;

    elementFoods.forEach(element => {
        element.setAttribute("data-id", foods[i].id);
        element.setAttribute("data-price", foods[i].price);
        element.setAttribute("data-type", foods[i].type);
        i++;
    });

    addToCarts.forEach(element => {
        if(j < 5)
        {
            element.setAttribute("data-id", foods[j].id);
            element.setAttribute("data-price", foods[j].price);
            element.setAttribute("data-img", foods[j].image);
            element.setAttribute("data-name", foods[j].name);
            j++;
        }

    });
}

$('.filter_price').click(function(){
    var elementMedicines = document.querySelectorAll(".medicines");
    var elementFoods = document.querySelectorAll(".foods");

    var price_from = parseFloat(document.querySelector(".price_from").textContent.replace(",","").replace(",","").replace("₫", ""));
    var price_to = parseFloat(document.querySelector(".price_to").textContent.replace(",","").replace(",","").replace("₫", ""));

    
    if(elementMedicines.length > 0)
    {
    elementMedicines.forEach(element => {
        var price_present = parseFloat(element.getAttribute("data-price").replace(",","").replace(",","").replace("₫", ""));

        if(price_from <= price_present && price_present <= price_to){
            element.style.display = "block";
        }else
        {
            element.style.display = "none";
        }
    })
    }

    if(elementFoods.length > 0)
    {
        elementFoods.forEach(element => {
            var price_present = parseFloat(element.getAttribute("data-price").replace(",","").replace(",","").replace("₫", ""));
    
            if(price_from <= price_present && price_present <= price_to){
                element.style.display = "block";
            }else
            {
                element.style.display = "none";
            }
        })
    }
})

$('.cart_foods').click(function(){
    var id = $(this).data("id");
    var price = $(this).data("price");
    var image = $(this).data("img");
    var name = $(this).data("name");
    var amount = 1;

    var data = {
        "id" : id,
        "price" : price,
        "amount" : amount,
        "image" : image,
        "name" : name
    }
    carts.push(data);

    getCarts();

})

$('.cart_medicines').click(function(){
    console.log("zxczx");
    var id = $(this).data("id");
    var price = $(this).data("price");
    var image = $(this).data("img");
    var name = $(this).data("name");
    var amount = 1;

    var data = {
        "id" : id,
        "price" : price,
        "amount" : amount,
        "image" : image,
        "name" : name
    }

    carts.push(data)

    getCarts();

})

function getCarts(){
    var html = "";

    if(carts.length > 0){
        var total = 0;

        carts.forEach(element => {
            total = total + parseFloat(element.price);

            html += `<div class="products__cart">
                        <img src="`+element.image+`" alt="">
                        <div class="products__cart--title">
                            <h4 class="products__cart--product">`+element.name+`</h4>
                            <p class="products__cart--amount">x`+element.amount+`</p>
                            <p class="products__cart--price">`+element.price+`đ</p>
                        </div>
                    </div>`;
        })

        var htmlCart = "<p>Tổng tiền: "+formatCurrency(total)+"đ</p>"
        
        $('.widget_shopping_cart_content').html(html);
        $('.cart_total').html(htmlCart);

    }
}

// Hàm để định dạng tiền tệ
function formatCurrency(amount) {
    return amount.toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

})