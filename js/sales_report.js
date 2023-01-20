$(function () {
    $("#tabs").tabs();

    $("input#daily_datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true
    });

    $('input#weekly_datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        showWeek: true,
        onSelect: function (dateText, inst) {
            var date = $(this).datepicker('getDate');
            let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
            let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $(this).val($.datepicker.formatDate(dateFormat, startDate, inst.settings) + " - " + $.datepicker.formatDate(dateFormat, endDate, inst.settings));
        }
    });

    $('#daily_sr_filter').unbind('click').on('click', function () {
        $('#daily_report_tbl').hide();
        $('#daily_report_tbl').DataTable().clear().destroy();

        let param = {
            mode: 'daily',
            txndate: $("input#daily_datepicker").val()
        };

        generateTable("daily_report_tbl", param);
    });

    $('#weekly_sr_filter').unbind('click').on('click', function () {
        $('#weekly_report_tbl').hide();
        $('#weekly_report_tbl').DataTable().clear().destroy();

        let param = {
            mode: 'weekly',
            txndate: $("input#weekly_datepicker").val()
        };

        generateTable("weekly_report_tbl", param);
    });

    $('#monthly_sr_filter').unbind('click').on('click', function () {
        $('#monthly_report_tbl').hide();
        $('#monthly_report_tbl').DataTable().clear().destroy();

        let param = {
            mode: 'monthly',
            txndate: $("input#monthly_datepicker").val()
        };

        generateTable("monthly_report_tbl", param);
    });

    $('#quarterly_sr_filter').unbind('click').on('click', function () {
        $('#quarterly_report_tbl').hide();
        $('#quarterly_report_tbl').DataTable().clear().destroy();

        let param = {
            mode: 'quarterly',
            year: $("select#quarterly_year").val(),
            qtr: $("select#quarterly_number").val()
        };

        generateTable("quarterly_report_tbl", param);
    });

    const generateTable = function (tbl_name, param) {
        $.get('api/generate_report.php', param, function (res) {
            let data = JSON.parse(res);
            let tbl_contents = "";
            let total_net = 0;
            let total_gross = 0;
            let ovr_total_disc = 0;
            let ovr_total_tax = 0;
            const formatter = new Intl.NumberFormat();

            $.each(data, function (i, d) {
                total_net = total_net + parseFloat(d.net_sales);
                total_gross = total_gross + parseFloat(d.gross_sales_total);
                ovr_total_disc = ovr_total_disc + parseFloat(d.total_discount);
                ovr_total_tax = ovr_total_tax + parseFloat(d.total_tax);

                tbl_contents += "<tr>";
                tbl_contents += "<td>" + d.transaction_date + "</td>";
                tbl_contents += "<td>" + d.item_id + "</td>";
                tbl_contents += "<td>" + d.item_name + "</td>";
                tbl_contents += "<td style='text-align:right;'>" + formatter.format(d.price) + "</td>";
                tbl_contents += "<td style='text-align:right;'>" + formatter.format(d.items_sold) + "</td>";
                tbl_contents += "<td style='text-align:right;'>" + formatter.format(d.discount) + "%</td>";
                tbl_contents += "<td style='text-align:right;'>" + formatter.format(d.gross_sales_total) + "</td>";
                tbl_contents += "<td style='text-align:right;'>" + formatter.format(d.total_discount) + "</td>";
                tbl_contents += "<td style='text-align:right;'><abbr title='Tax rate = " + d.tax_rate + "%'>" + formatter.format(d.total_tax) + "<abbr></td>";
                tbl_contents += "<td style='text-align:right;'>" + formatter.format(d.net_sales) + "</td>";
                tbl_contents += "</tr>";
            });

            let footer_contents = "<tr>" +
                "<th colspan=6 style='text-align:right;'> TOTALS</th >" +
                "<th style='text-align:right;'>" + formatter.format(total_gross) + "</th>" +
                "<th style='text-align:right;'>" + formatter.format(ovr_total_disc) + "</th>" +
                "<th style='text-align:right;'>" + formatter.format(ovr_total_tax) + "</th>" +
                "<th style='text-align:right;'>" + formatter.format(total_net) + "</th>" +
                "</tr>";

            $('#' + tbl_name + ' tbody').html(tbl_contents);
            $('#' + tbl_name + ' tfoot').html(footer_contents);


            // $('#daily_datepicker')
            $('#' + tbl_name + '').DataTable({
                "paging": false,
                "info": false,
            });
            $('#' + tbl_name + '').show();
        });
    }




    $('#daily_sr_filter').trigger('click');
    $('#weekly_sr_filter').trigger('click');
    $('#monthly_sr_filter').trigger('click');
    $('#quarterly_sr_filter').trigger('click');
});
