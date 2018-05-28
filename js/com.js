$(function () {
    $(".pop-btn").click(function () {
        $(".cover").hide();
        $(this).parent().hide();
    });
    $(document).click(function(e){
        var _con = $(".drop, .icon-arrow");
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            $(".drop-content").hide();
        }
    });
    var dropIndex=1;
    $(".drop").click(function(e){
        if (e.target.className == "sub-btn") {
            $(this).find(".drop-content").hide();
        }
        else{
            $(this).find(".drop-content").show().css("z-index",dropIndex++);
        }
    });
    $(".drop-content input[name='all']").click(function(){
        if ($(this).prop("checked")) {
            $(this).parent().parent().nextAll('li').find("input").attr("checked",true);
        }
        else
        {
            $(this).parent().parent().nextAll('li').find("input").attr("checked",false);
        }
    });
    $(".drop-content .sub-btn").click(function (e) {
        console.log(e.target.className);
        
        var sText = '';
        var _this = $(this);
        _this.prev().find("input").each(function(){
            if($(this).attr("name")!="all"){
                if ($(this).prop("checked")) {
                    sText += $(this).val()+',';
                }
            }
        });
        sText = sText.substring(0,sText.length-1);
        _this.parent().parent().find(".show").text(sText);
    });
});