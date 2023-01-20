$(function () {
    $('#add_item').on('click', function (e) {
        e.preventDefault();
        let item_name = $('#add_item_form input#item_name').val();
        let item_desc = $('#add_item_form textarea#item_desc').val();
        let item_image = $('#add_item_form input#item_image')[0].files[0];
        let item_price = $('#add_item_form input#price').val();
        let item_qty = $('#add_item_form input#qty').val();
        let discount = $('#add_item_form input#discount').val();
        let tax_rate = $('#add_item_form input#tax_rate').val();
        let hasError = false;

        if (item_name == "") {
            $('#add_item_form span#item_name').html('Item Name is required.');
        } else {
            $('#add_item_form span#item_name').html("");
        }
        if (item_desc == "") {
            $('#add_item_form span#item_desc').html('Item Description is required.');
        } else {
            $('#add_item_form span#item_desc').html("");
        }
        if (item_qty == "") {
            $('#add_item_form span#qty').html('Quantity is required.');
        } else {
            $('#add_item_form span#qty').html("");
        }
        if (item_price == "") {
            $('#add_item_form span#price').html('Price is required.');
        } else {
            $('#add_item_form span#price').html("");
        }
        if (discount == "") {
            $('#add_item_form span#discount').html('Discount is required.');
        } else {
            $('#add_item_form span#discount').html("");
        }
        if (tax_rate == "") {
            $('#add_item_form span#tax_rate').html('Tax Rate is required.');
        } else {
            $('#add_item_form span#tax_rate').html("");
        }
        if (typeof item_image == 'undefined') {
            $('#add_item_form span#item_image').html('Item Image is required.');
        } else {
            $('#add_item_form span#item_image').html("");
        }


        $.each($('span.errormsg'), function (i, d) {
            if ($(d).html() !== "") {
                hasError = true;
                return false;
            }
        });

        if (!hasError) {
            var frm = new FormData();
            frm.append('item_image', item_image);
            frm.append('item_name', item_name);
            frm.append('item_desc', item_desc);
            frm.append('item_price', item_price);
            frm.append('item_qty', item_qty);
            frm.append('discount', discount);
            frm.append('tax_rate', tax_rate);
            $.ajax({
                method: 'POST',
                url: 'api/add_product.php',
                data: frm,
                contentType: false,
                processData: false,
                cache: false,
                success: function (res) {
                    let data = JSON.parse(res)
                    if (typeof data.error === "undefined" && data.result) {
                        alert('New item has been successfully added.');
                        window.location = 'products.php';
                    } else {
                        alert(data.error);
                    }
                }
            });

        }
    });

    $.get('api/get_products.php', function (res) {
        let data = JSON.parse(res);
        $('.btn-edit-item').unbind('click').on('click', function () {
            let item_id = $(this).data('item_id');
            let item_details = data.find((f) => f.id == item_id);
            let img_name = item_details.image.substring(item_details.image.indexOf('/') + 1);
            const $target = $(this).data('target');
            $('#upd_item_form input#item_name').val(item_details.name);
            $('#upd_item_form textarea#item_desc').val(item_details.desc);
            $('#upd_item_form input#price').val(item_details.price);
            $('#upd_item_form input#discount').val(item_details.discount);
            $('#upd_item_form input#tax_rate').val(item_details.tax_rate);
            $('#upd_item_form input#qty').val(item_details.qty);
            $('#upd_item_form #file-js-example span#file-name').html(img_name);

            $('#upd_item_form img#upd-img-viewer').attr("src", item_details.image);

            $('#upd_item').on('click', function (e) {
                e.preventDefault();
                let item_name = $('#upd_item_form input#item_name').val();
                let item_desc = $('#upd_item_form textarea#item_desc').val();
                let item_image = $('#upd_item_form input#item_image')[0].files[0];
                let item_image_name = $('#upd_item_form #file-js-example span#file-name').html();
                let item_price = $('#upd_item_form input#price').val();
                let discount = $('#upd_item_form input#discount').val();
                let tax_rate = $('#upd_item_form input#tax_rate').val();
                let item_qty = $('#upd_item_form input#qty').val();
                let hasError = false;

                if (item_name == "") {
                    $('#upd_item_form span#item_name').html('Item Name is required.');
                } else {
                    $('#upd_item_form span#item_name').html("");
                }
                if (item_desc == "") {
                    $('#upd_item_form span#item_desc').html('Item Description is required.');
                } else {
                    $('#upd_item_form span#item_desc').html("");
                }
                if (item_qty == "") {
                    $('#upd_item_form span#qty').html('Quantity is required.');
                } else {
                    $('#upd_item_form span#qty').html("");
                }
                if (item_price == "") {
                    $('#upd_item_form span#price').html('Price is required.');
                } else {
                    $('#upd_item_form span#price').html("");
                }
                if (discount == "") {
                    $('#upd_item_form span#discount').html('Discount is required.');
                } else {
                    $('#upd_item_form span#discount').html("");
                }
                if (tax_rate == "") {
                    $('#upd_item_form span#tax_rate').html('Tax Rate is required.');
                } else {
                    $('#upd_item_form span#tax_rate').html("");
                }
                if (
                    typeof item_image == 'undefined'
                    && item_image_name == "No file uploaded"
                ) {
                    $('#upd_item_form span#item_image').html('Item Image is required.');
                } else {
                    $('#upd_item_form span#item_image').html("");
                }


                $.each($('span.errormsg'), function (i, d) {
                    if ($(d).html() !== "") {
                        hasError = true;
                        return false;
                    }
                });

                if (!hasError) {
                    var frm = new FormData();

                    if (item_image_name !== img_name) {
                        frm.append('item_image', item_image);
                    }

                    if (item_name !== item_details.name) {
                        frm.append('item_name', item_name);
                    }

                    if (item_desc !== item_details.desc) {
                        frm.append('item_desc', item_desc);
                    }

                    if (item_price !== item_details.price) {
                        frm.append('price', item_price);
                    }

                    if (item_qty !== item_details.qty) {
                        frm.append('item_qty', item_qty);
                    }

                    if (discount !== item_details.discount) {
                        frm.append('discount', discount);
                    }

                    if (tax_rate !== item_details.tax_rate) {
                        frm.append('tax_rate', tax_rate);
                    }

                    let itr = 0;
                    for (const pair of frm.entries()) {
                        itr++;
                    }
                    if (itr > 0) {
                        frm.append('item_id', item_id);
                        $.ajax({
                            method: 'POST',
                            url: 'api/update_product.php',
                            data: frm,
                            contentType: false,
                            processData: false,
                            cache: false,
                            success: function (res) {
                                let data = JSON.parse(res)
                                if (typeof data.error === "undefined" && data.result) {
                                    alert('Item has been successfully updated.');
                                    window.location = 'products.php';
                                } else {
                                    alert(data.error);
                                }
                            }
                        });
                    } else {
                        alert('No changes detected.');
                    }

                }
            });
        });

        $('.btn-delete-item').unbind('click').on('click', function () {
            let item_id = $(this).data('item_id');
            let choice = confirm("Are you sure you want to remove this item in the product list?");
            if (choice) {
                $.post('api/remove_product.php', { item_id }, function (res) {
                    let data = JSON.parse(res)
                    if (typeof data.error === "undefined") {
                        alert('Item successfully removed!');
                        window.location = 'products.php';
                    } else {
                        alert(data.error);
                    }
                });
            }
        });

        $('#products_table').DataTable();
    });
});