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
    $(".drop").click(function(){
        $(this).find(".drop-content").show().css("z-index",dropIndex++);
    });
    $(".drop-content input[name='all']").click(function(){
        console.log($(this).parent().nextAll().find('input'));
        if ($(this).prop("checked")) {
            $(this).parent().parent().nextAll('li').find("input").attr("checked",true);
        }
        else
        {
            $(this).parent().parent().nextAll('li').find("input").attr("checked",false);
        }
    });
    $(".drop-content input").click(function () {
        var _thisName = $(this);
        console.log(_thisName);
    });
})