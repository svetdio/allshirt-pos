if (typeof localStorage['asco_user'] == 'undefined') {
  alert("You are not logged-in\n\nPlease log in first");
  window.location = 'login.php';
}

function initApp() {
  const app = {
    db: null,
    time: null,
    firstTime: false,
    // firstTime: localStorage.getItem("first_time") === null,
    activeMenu: 'pos',
    loadingSampleData: false,
    moneys: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "0", "Clear"],
    products: [],
    keyword: "",
    cart: [],
    cash: 0,
    change: 0,
    isShowModalReceipt: false,
    receiptNo: null,
    receiptDate: null,
    async initDatabase() {
      let me = this;
      $.get('api/get_products.php', function (res) {
        let products = JSON.parse(res);
        me.loadProducts(products);
      });
    },
    loadProducts(products) {
      this.products = products;
      console.log("products loaded", this.products);
    },
    startBlank() {
      this.setFirstTime(false);
    },
    setFirstTime(firstTime) {
      this.firstTime = firstTime;
      if (firstTime) {
        localStorage.removeItem("first_time");
      } else {
        localStorage.setItem("first_time", new Date().getTime());
      }
    },
    filteredProducts() {
      const rg = this.keyword ? new RegExp(this.keyword, "gi") : null;
      return this.products.filter((p) => !rg || p.name.match(rg));
    },
    addToCart(product) {
      const index = this.findCartIndex(product);
      if (index === -1) {
        this.cart.push({
          productId: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          option: product.option,
          qty: 1,
          discount: product.discount,
          tax_rate: product.tax_rate,
          discounted_price: product.discounted_price,
          remaining_stock: product.qty,
        });
      } else {
        this.cart[index].qty += 1;
      }
      this.beep();
      this.updateChange();
    },
    findCartIndex(product) {
      return this.cart.findIndex((p) => p.productId === product.id);
    },
    addQty(item, qty) {
      const index = this.cart.findIndex((i) => i.productId === item.productId);
      const remaining_stock = parseInt(item.remaining_stock);
      if (index === -1) {
        return;
      }
      const afterAdd = item.qty + qty;
      if (afterAdd === 0 || qty == 0) {
        this.cart.splice(index, 1);
        this.clearSound();
      } else {
        if (afterAdd <= remaining_stock) {
          this.cart[index].qty = afterAdd;
        } else if (afterAdd > remaining_stock) {
          this.cart[index].qty = remaining_stock;
        }
        this.beep();
      }
      this.updateChange();
    },
    addCash(amount) {
      if (((this.cash.toString()).match(/\./g) || []).length > 0 && amount == ".") {
        return;
      }

      this.cash = (amount == "Clear") ? "0" : ((this.cash || 0) + "" + amount);
      this.updateChange();
      this.beep();
    },
    getItemsCount() {
      return this.cart.reduce((count, item) => count + item.qty, 0);
    },
    updateChange() {
      this.change = this.cash - this.getTotalPrice();
    },
    updateCash(value) {
      this.cash = parseFloat(value);
      this.updateChange();
    },
    getTotalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.qty * ((item.discount > 0) ? item.discounted_price : item.price),
        0
      );
    },
    submitable() {
      return this.change >= 0 && this.cart.length > 0;
    },
    submit() {
      const time = new Date();
      this.isShowModalReceipt = true;
      this.receiptNo = `ALLSHIRT-CO-${Math.round(time.getTime() / 1000)}`;
      this.receiptDate = this.dateFormat(time);
    },
    closeModalReceipt() {
      this.isShowModalReceipt = false;
    },
    dateFormat(date) {
      const formatter = new Intl.DateTimeFormat('id', { dateStyle: 'short', timeStyle: 'short' });
      return formatter.format(date);
    },
    numberFormat(number) {
      return parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return (number || "")
        .toString()
        .replace(/^0|\./g, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    priceFormat(number) {
      return number ? `Php ${this.numberFormat(number)}` : `Php 0`;
    },
    clear() {
      this.cash = 0;
      this.cart = [];
      this.receiptNo = null;
      this.receiptDate = null;
      this.updateChange();
      this.clearSound();
    },
    beep() {
      this.playSound("sound/beep-29.mp3");
    },
    clearSound() {
      this.playSound("sound/button-21.mp3");
    },
    playSound(src) {
      const sound = new Audio();
      sound.src = src;
      sound.play();
      sound.onended = () => delete (sound);
    },
    printAndProceed() {
      let me = this;

      const receiptContent = document.getElementById('receipt-content');
      const titleBefore = document.title;
      const printArea = document.getElementById('print-area');

      printArea.innerHTML = receiptContent.innerHTML;
      document.title = this.receiptNo;

      window.print();
      me.isShowModalReceipt = false;

      printArea.innerHTML = '';
      document.title = titleBefore;

      this.saveTxn(this.cart, function (success) {
        if (success) {
          me.clear();
          me.initDatabase();
        }
      });

    },
    logout() {
      let conf = confirm("Do you want to log-out?");
      if (conf) {
        alert('You have been successfully logged-out');
        localStorage.removeItem('asco_user');
        window.location = 'login.php';
      }
    },
    saveTxn(cart_data, callback) {
      let parsed_cart_data = JSON.parse(JSON.stringify(cart_data));
      let user_data = JSON.parse(localStorage['asco_user']);
      let payload = {
        "cart": parsed_cart_data,
        "emp_id": user_data.emp_id,
        'paid_amt': parseFloat(this.cash)
      };

      $.post('api/checkout.php', payload, function (res) {
        callback(true);
      });
    }
  };

  return app;
}
