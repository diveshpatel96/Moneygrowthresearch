if( $('.equity.owl-carousel').length > 0 ) {
  $('.equity.owl-carousel').owlCarousel({
              loop: true,
              margin: 20,
              nav: false,
              autoplay: true,
              autoplayTimeout: 2000,

              responsive: {
                  0: {
                      items: 1
                  },
                  600: {
                      items: 2
                  },
                  1000: {
                      items: 3
                  }
              }
  })
}

if( $('.testi.owl-carousel').length > 0 ) {
  $('.testi.owl-carousel').owlCarousel({
    items: 3,
    margin:20,
    lazyLoad: true,
    dots:true,
    autoPlay: true,
    autoPlayTimeout: 3000,
    responsive:{
      0:{
        items:1,
      },
      600:{
        items:2,
      },
      1000:{
        items:2,
      }
    }
  });
}

const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

counters.forEach(counter => {
const updateCount = () => {
  const target = +counter.getAttribute('data-target');
  const count = +counter.innerText;

  // Lower inc to slow and higher to slow
  const inc = target / speed;

  // console.log(inc);
  // console.log(count);

  // Check if target is reached
  if (count < target) {
    // Add inc to count and output in counter
    counter.innerText = count + inc;
    // Call function every ms
    setTimeout(updateCount, 1);
  } else {
    counter.innerText = target;
  }
};

updateCount();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

if( $('.slider').length > 0 ) {
$(document).ready(function() {
  var options = {
    speed: 1000,
    effect: 'coverflow',
    autoplay: {
            delay: 6000,
            
        },

    parallax: true,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
            rotate: 35,
            stretch: 0,
            depth: 10,
            modifier: 1,
            slideShadows : true,
          },
    navigation: {
      nextEl: '.slider .next-ctrl',
      prevEl: '.slider .prev-ctrl'
    },
    on: {
      init: function() {
        let swiper = this;
        for(let i=0; i<swiper.slides.length; i++) {
          $(swiper.slides[i]).find(".image-area").attr({'data-swiper-parallax': 0.75 * swiper.width})
        }
        let index = swiper.activeIndex;
        $(swiper.slides).removeClass("active");
        $(swiper.slides[index]).addClass("active");
      },
      transitionEnd: function() {
        let swiper = this;
        let index = swiper.activeIndex;
        $(swiper.slides).removeClass("active");
        $(swiper.slides[index]).addClass("active");
      },
      resize: function() {
        this.update();
      }
    }
  }
  var slider = new Swiper('.slider', options);
});
}
if( $('.js-upload-file-btn').length > 0 ) {
$('.js-upload-file-btn').on('click',function () {
    $(".js-upload-file, .modal-backdrop").addClass("open");
});
}

// close all modal
$(document).on('click','.modal .close',function () {
    $(".modal, .modal-backdrop").removeClass("open");
});

    $(document).ready(function() {
      if($('#example').length > 0)
        $('#example').DataTable({
          "aaSorting": []
      });

  $('.step-slide').each(function(){
      $(this).css(
          'height',
          $(this).children('fieldset:first').height()+
              $(this).children('.buttons').height()
      );

      $(this).append('<input type="number" class="step-slide-index" value="1" style="display:none">');
  });

  var stepSlideIndex = 0; var stepSlideDirection = '';
  $('.step-slide .button').click(function(){
      stepSlideIndex = $(this).parent().parent().children('.step-slide-index').val();

      switch ($(this).text()) {
          case 'Back': stepSlideDirection = 'back'; break;
          case 'Next': stepSlideDirection = 'further'; break;
      }

      if($(this).text() != 'Finish')
        stepSlide ( $(this).parent().parent().parent().children('.steps-wrapper'),$(this).parent().parent(),stepSlideIndex,stepSlideDirection);
      else
      {
        let dataForm = document.getElementById('registerform');
        var obj = new FormData(dataForm);
        $.ajax({
          url: baseurl + "authenticate/register",
          type: "POST",
          data: obj,
          contentType: false,
          cache: false,
          processData: false,
          success: function (e) {
            if(e == 1)
              showNotifications('error','This email address is already registered.');
            else if(e == 2){
              showNotifications('success','Your account has been created. Please, check your email for the activation link.');
              setTimeout(function(){
                window.location = baseurl+'home/login';
            },3000);
            }
            else
              showNotifications('error',e);
          }
        });
      }
  });

  $('#pan,input[name="share_name"],#ifsccode').on('keyup',function(){
    let pan = ($(this).val()).toUpperCase();
    $(this).val(pan);
  });

});

function stepSlide(steps, fields, index, direction){
var err = 0;
  if( index == 1 ) {
    var pic = $.trim($('#pic').val());
   /*  var adharpic = $.trim($('#adharpic').val());
    var panpic = $.trim($('#panpic').val()); */
    var uname = $.trim($('#nm').val());
    var email = $.trim($('#em').val());
    var pwd = $.trim($('#pwd').val());
    var dob = $.trim($('#dob').val());
    var mob = $.trim($('#mob').val());
    var adhar = $.trim($('#adhar').val());
    var pan = $.trim($('#pan').val());
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
    if(pic == ''){
      showNotifications('error','Please upload your photo.');
      if(pic == ''){ err++;}
    } else if(uname == ''){
        showNotifications('error','Please enter your name.');
        if(uname == ''){ $("#nm").focus(); err++;}
    }else if(email == ''){
        showNotifications('error','Please enter your email.');
        if(email == ''){ $("#em").focus(); err++;}
    }else if(!regex.test(email)){
        showNotifications('error','Please enter a valid email.');
        if(!regex.test(email)){ $("#em").focus(); err++;}
    }else if(pwd == ''){
        showNotifications('error','Please enter password.');
        if(pwd == ''){ $("#pwd").focus(); err++;}
    }else if(dob == ''){
      showNotifications('error','Please enter date of birth.');
      if(dob == ''){ $("#dob").focus(); err++;}
    }else if(mob == ''){
      showNotifications('error','Please enter mobile number.');
      if(mob == ''){ $("#mob").focus(); err++;}
    }else if(mob.length != 10){
      showNotifications('error','Please enter 10 digit mobile number.');
      if(mob.length != 10){ $("#mob").focus(); err++;}
    }else if(adhar == ''){
      showNotifications('error','Please enter aadhaar card number.');
      if(adhar == ''){ $("#adhar").focus(); err++;}
    }else if(adhar.length != 12){
      showNotifications('error','Please enter 12 digit aadhar card number.');
      if(adhar.length != 12){ $("#adhar").focus(); err++;}
    } /* else if(adharpic == ''){
      showNotifications('error','Please upload your aadhaar photo.');
      if(adharpic == ''){ err++;}
    } */ else if(pan == ''){
      showNotifications('error','Please enter pan card number.');
      if(pan == ''){ $("#pan").focus(); err++;}
    }else if(pan.length != 10){
      showNotifications('error','Please enter 10 digit pan card number.');
      if(pan.length != 10){ $("#pan").focus(); err++;}
    } /* else if(panpic == ''){
      showNotifications('error','Please upload your pan card photo.');
      if(panpic == ''){ err++;}
    } */
  }
  else if( index == 2 ){
    var accnum = $.trim($('#accnum').val());
    var ifsccode = $.trim($('#ifsccode').val());
    if(accnum == ''){
      showNotifications('error','Please enter your account number.');
      if(accnum == ''){ $("#accnum").focus(); err++;}
    }else if(ifsccode == ''){
        showNotifications('error','Please enter your ifsc code.');
        if(ifsccode == ''){ $("#ifsccode").focus(); err++;}
    }
  }

  if( err == 0 ){
    fields.children('fieldset:nth-of-type('+index+')').addClass('hidden');

    switch (direction) {
        case 'back': fields.children('.step-slide-index').val(--index); break;
        case 'further': fields.children('.step-slide-index').val(++index); break;
    }

    fields.children('fieldset:nth-of-type('+index+')').removeClass('hidden');

    steps.children('.step'+index).addClass('activestep');

    switch (direction) {
        case 'back': steps.children('.step'+(index+1)).removeClass('activestep'); break;
        case 'further': steps.children('.step'+(index-1)).removeClass('activestep'); break;
    }

    fields.css(
        'height',
        fields.children('fieldset:nth-of-type('+index+')').height()+
            fields.children('.buttons').height()
    );

    switch (index) {
        case 1: fields.children('.buttons').children('.back').css('display', 'none'); break;
        case 2: fields.children('.buttons').children('.back').css('display', 'inline');
                fields.children('.buttons').children('.further').css('display', 'inline');
                fields.children('.buttons').children('.send').css('display', 'none'); break;
        case 3: fields.children('.buttons').children('.further').css('display', 'none');
                fields.children('.buttons').children('.send').css('display', 'inline'); break;
    }
  }
}

// login js
function loginSection(){
var email = $.trim($('#em').val());
var pwd = $.trim($('#pwd').val());
var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if(email == ''){
    showNotifications('error','Please enter your email.');
    if(email == ''){ $("#em").focus();}
}else if(!regex.test(email)){
    showNotifications('error','Please enter a valid email.');
    if(email == ''){ $("#em").focus();}
}else if(pwd == ''){
    showNotifications('error','Please enter password.');
    
    if(pwd == ''){ $("#pwd").focus();}
}else{
    let formdata = {};
    formdata.em = email;
    formdata.pwd = pwd;
    formdata.rem = $('#rememberme:checked').length;

    $.ajax({
        url: baseurl + 'authenticate/login', 
        type: "POST",             
        data: formdata,      
        success: function(e) {
            if(e == 0)
                showNotifications('error','We can\'t find your email.');
            else if(e == 1)
                showNotifications('error','Your password doesn\'t match with our records.');
            else if(e == 2)
                showNotifications('error','Your account is InActive. Please, activate your account from the activation link sent to your registered email account.');
            else if( e == 5 ) {
                showNotifications('success','Welcome, you logged in successfully.');
                setTimeout(function(){
                    window.location = baseurl+'home/checkLoginUser';
                },3000);
            }
            else
                showNotifications('error','Your application has been rejected. Here is the reason : '+e+'.');
        }
    });
}

}

// Forgot Password
function forgotSection(){
var email = $.trim($('#em').val());
var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if(email == ''){
    showNotifications('error','Please enter your email.');
    if(email == ''){ $("#em").focus();}
}else if(!regex.test(email)){
    showNotifications('error','Please enter a valid email.');
    if(email == ''){ $("#em").focus();}
}else{
    let formdata = {};
    formdata.em = email;
    $.ajax({
        url: baseurl + 'authenticate/forgotSection', 
        type: "POST",             
        data: formdata,      
        success: function(e) {
            if(e == 0)
                showNotifications('error','We can\'t find your email.');
            else if(e == 2)
                showNotifications('error','Your account is InActive. Please, activate your account from the activation link sent to your registered email account.');
            else if(e == 3)
                showNotifications('error','Your account is Blocked. Please, contact support.');
            else if( e == 5 ) {
                showNotifications('success','Check your email for the new password.');
                setTimeout(function(){
                    window.location = baseurl;
                },3000);
            }
            else
                showNotifications('error','Something went wrong. Please, refresh the page and try again.');
        }
    });
}

}

function showNotifications(type, message){
if( type == 'success' )
  toastr.success(message)
else
  toastr.error(message)
}

function addAnotherSell(){
let e_id = $('input[name="e_id"]').val();
let saleCounter = $('input[name="saleCounter"]').val();
if( e_id != 0 ){
  var sellboxParent = $('.sellboxParent').html();
  let sellboxHtml = sellboxParent.replace(/X/g,saleCounter);
  $('.sellbox').append(sellboxHtml);
  saleCounter = parseInt(saleCounter) + 1;
  $('input[name="saleCounter"]').val(saleCounter);
}
else{
  showNotifications('error','You can\'t make another sell entry in same time. Save it, and then edit to do the partial or another sell entry');
}
}

function removeSell(counter){
let saleCounter = parseInt(counter) - 1;
$('input[name="saleCounter"]').val(saleCounter);
$('.sell_container'+counter).remove();
}

function addentries(){
let formdata = {};
$('.entryCls').each(function(){
  let nm = $(this).attr('name');
  let vl = $(this).val();
  formdata[nm] = vl ;
});
$.ajax({
  url: baseurl + 'admin/modify_entry', 
  type: "POST",             
  data: formdata,      
  success: function(e) {
      if(e == 0)
          showNotifications('error','Something went wrong. Please, refresh the page and try again.');
      else if(e == 2){
        showNotifications('success','Entry Updated Successfully.');
        setTimeout(function(){
          window.location = baseurl+'admin/entries';
      },3000);
      }
      else if(e == 1){
        showNotifications('success','Entry Added Successfully.');
        setTimeout(function(){
          window.location = baseurl+'admin/entries';
      },3000);
      }
      else if(e == 3)
          showNotifications('error','Share Name and Buy Date Time is mandatory.');
      else
        showNotifications('error','Something went wrong. Please, refresh the page and try again.');
  }
});
}

function showriskprofile(){
let formdata = {};
$('.form-check-input').each(function(){
  if( $(this).is(':checked') ){
    let nm = $(this).attr('name');
    let vl = $(this).val();
    formdata[nm] = vl ;
  }
});
let len = Object.keys(formdata).length
if( len > 12 ){
  formdata['saveriskprofile'] = 1;
  $.ajax({
    url: baseurl + 'home/riskprofile', 
    type: "POST",             
    data: formdata,      
    success: function(e) {
        if(e == 1){
          let temp = {'2':'MODERATE', '3':'HIGH'};
          let r = Math.floor(Math.random() * 2)
          let k = r + parseInt(2);
          $('.number').text(temp[k])
          $('#gaugeId').attr('class','')
          $('#gaugeId').attr('class','gauge four rischio'+k)
          $('#normalModal').modal('show');
        }
        else
          showNotifications('error','Something went wrong. Please, refresh the page and try again.');
    }
  });
}
else
  showNotifications('error','Select all options to get accurate results.');
}

function activateClient(uid){
$.ajax({
  url: baseurl + 'admin/activateClient', 
  type: "POST",             
  data: {'uid':uid},      
  success: function(e) {
      if(e == 0)
          showNotifications('error','Something went wrong. Please, refresh the page and try again.');
      else if(e == 1)
          showNotifications('success','Client Activated Successfully.');

        setTimeout(function(){
            window.location = baseurl+'admin/clients';
        },3000);
  }
});
}


function rejectClient(uid){
$('#normalModal').modal('show');
$('#rejectClientButton').data('userid',uid);
}

function finalRejectClient(){
  let uid = $('#rejectClientButton').data('userid');
  let reason_for_rejection = $('#reason_for_rejection').val();
  if( reason_for_rejection != "" ){
    $.ajax({
      url: baseurl + 'admin/rejectClient', 
      type: "POST",             
      data: {'uid':uid,'reason_for_rejection':reason_for_rejection},      
      success: function(e) {
          if(e == 0)
              showNotifications('error','Something went wrong. Please, refresh the page and try again.');
          else if(e == 1)
              showNotifications('success','We have sent email to client with reason for rejection.');

            setTimeout(function(){
                window.location = baseurl+'admin/clients';
            },3000);
      }
    });
  }
  else{
    showNotifications('error','Please, enter reason for rejection.');
  }
}


function changeSubAdminPassword(_this){
$('#normalModal').modal('show');
$('#subadminname').val($(_this).data('uname'));
$('#subadminemail').val($(_this).data('uemail'));
$('#changePasswordsubAdminButton').data('userid',$(_this).data('uid'));
}

function changePasswordsubAdmin(){
  let uid = $('#changePasswordsubAdminButton').data('userid');
  let subadminpassword = $('#subadminpassword').val();
  let subadminname = $('#subadminname').val();
  let subadminemail = $('#subadminemail').val();
  if( subadminemail != "" && subadminname != "" ){
    $.ajax({
      url: baseurl + 'admin/sub_admin', 
      type: "POST",             
      data: {'uid':uid,'subadminpassword':subadminpassword,'subadminname':subadminname,'subadminemail':subadminemail},      
      success: function(e) {
          if(e == 0)
              showNotifications('error','Something went wrong. Please, refresh the page and try again.');
          else if(e == 1)
              showNotifications('success','Sub-Admin details changed successfully.');

            setTimeout(function(){
                window.location = baseurl+'admin/sub_admin';
            },3000);
      }
    });
  }
  else{
    showNotifications('error','Name and Email can\'t be empty.');
  }
}


function changeAdminPassword(){
$('#changePasswordAdmin').modal('show');
}

function changePasswordAdmin(){
  let adminpassword = $('#adminpassword').val();
  if( adminpassword != "" ){
    $.ajax({
      url: baseurl + 'admin/change_password', 
      type: "POST",             
      data: {'adminpassword':adminpassword},      
      success: function(e) {
          if(e == 0)
              showNotifications('error','Something went wrong. Please, refresh the page and try again.');
          else if(e == 1)
              showNotifications('success','Admin password changed successfully.');

            setTimeout(function(){
                window.location = baseurl+'admin/dashboard';
            },3000);
      }
    });
  }
  else{
    showNotifications('error','Please, enter password.');
  }
}

$(document).on('ready',function(){
$(document).on('focus','.entryCls',function(){
  if($(this).val() == 0)
    $(this).val('');
});
$(document).on('keyup','.entryCls',function(){
  let bqty = $('input[name="total_buy_qty"]').val();
  bqty = parseInt(bqty)
  let sqty = 0;
  $('.total_sell_qtyCls').each(function(){
    sqty = sqty + parseInt($(this).val())
  });
  sqty = parseInt(sqty)
  if( sqty > bqty )
    showNotifications('error','Sell Quantity can\'t be more than Buy Quantity.');
  else if( !isNaN(bqty) && bqty != 0 ) {
    let bps = $('input[name="buy_per_share"]').val();
    let tbprice = 0;
    if( !isNaN(bqty) ) {
      tbprice = bps * bqty;
      $('input[name="total_buy_value"]').val(tbprice);
      $('input[name="acquisition_cost"]').val(tbprice);
    }
    
    if( !isNaN(sqty) ) {
      let holding =  Math.round(( ( bqty -  sqty ) /  bqty ) * 100);
      $('input[name="holding_precentage"]').val(holding);
    }
    let numOfShares = bqty - sqty;
    let ltp =  $('input[name="ltp"]').val();
    
    let totShareQty = bqty
    let cv = 0;
    let tsv = 0;
    if( !isNaN(sqty) ) {
      totShareQty = bqty - sqty

      $('.total_sell_valueCls').each(function(){
        let dbid = $(this).data('dbid');
        let temp_sps = $('#sell_per_share'+dbid).val();
        let temp_sqty = $('#total_sell_qty'+dbid).val();
        $(this).val(temp_sps * temp_sqty);
        tsv = tsv + parseInt(temp_sps * temp_sqty)
      })
      
      if( !isNaN(ltp) && ltp != 0 ) {
        cv = ltp * totShareQty
      }
    }
    $('input[name="current_value"]').val(cv);
    $('input[name="balance_qty"]').val(numOfShares);
    let unrp = 0;
    if( ltp != 0 ){
      unrp1 = (ltp * totShareQty) ;
      unrp2 = totShareQty * bps ;
      unrp = unrp1 - unrp2 ;
    }
    $('input[name="unrealised_pnl"]').val(unrp);
    
    let rp = 0;
    if( !isNaN(tsv) && tsv != 0 && bps != 0 && sqty != bqty ){
      rp1 = tsv;
      rp2 = sqty * bps;
      rp = rp1 - rp2;
    }
    $('input[name="realised_pnl"]').val(rp);
    
    let pnl = 0;
    let finaltsprice = tsv
    if( bqty == sqty )
      pnl = finaltsprice - tbprice ;

    let type = '';
    if( pnl > 0 )
      type = 'profit';
    else
      type = 'loss';

    $('input[name="total_pnl"]').val(pnl);
    $('input[name="pnl_type"]').val(type);
    
  }
});

});

function getPriceAction(_this){
let v = $(_this).text();
let dbid = $(_this).data('dbid');
$('.dropdown-clickable[data-dbid="'+dbid+'"]').text(v);
}

function assignPlan(_this){
let v = $(_this).text();
let dbid = $(_this).data('dbid');
$('#clientPlan').val(dbid);
$('.dropdown-clickable').text(v);
}

function saveClientPlan(cid){
$.ajax({
  url: baseurl + 'admin/saveClientPlan', 
  type: "POST",             
  data: {'dbid':$('#clientPlan').val() , 'cid' : cid},      
  success: function(e) {
      if(e == 0)
          showNotifications('error','Something went wrong. Please, refresh the page and try again.');
      else if(e == 1)
          showNotifications('success','Plan updated successfully.');

        setTimeout(function(){
            window.location = baseurl+'admin/client_profile/'+cid;
        },3000);
  }
});
}

function showHomePlan(_this){
let txt = $(_this).data('action');
$('#plan_action').text(txt);
$('#basicModal').modal('show');
}

function savePricingAction(dbid){
let price_action = $('.dropdown-clickable[data-dbid="'+dbid+'"]').text();

$.ajax({
  url: baseurl + 'admin/savePricingAction', 
  type: "POST",             
  data: {'dbid':dbid , 'price_action' : price_action},      
  success: function(e) {
      if(e == 0)
          showNotifications('error','Something went wrong. Please, refresh the page and try again.');
      else if(e == 1)
          showNotifications('success','Pricing Action updated successfully.');

        setTimeout(function(){
            window.location = baseurl+'admin/pricingplans';
        },3000);
  }
});

}

function deleteEntry(entryid){
$('#deleteEntryModal').modal('show');
$('#finalDeleteEntryButton').data('entryid',entryid);
}

function finalDeleteEntry(){
let entryid = $('#finalDeleteEntryButton').data('entryid');
  $.ajax({
    url: baseurl + 'admin/deleteEntry', 
    type: "POST",             
    data: {'entryid':entryid},      
    success: function(e) {
        if(e == 0)
            showNotifications('error','Something went wrong. Please, refresh the page and try again.');
        else if(e == 1)
            showNotifications('success','Entry deleted successfully.');

          setTimeout(function(){
              window.location = baseurl+'admin/entries';
          },3000);
    }
  });
}


function deleteClient(clientid){
$('#basicModal').modal('show');
$('#finalDeleteClientButton').data('clientid',clientid);
}

function finalDeleteClient(){
let clientid = $('#finalDeleteClientButton').data('clientid');
  $.ajax({
    url: baseurl + 'admin/deleteClient', 
    type: "POST",             
    data: {'clientid':clientid},      
    success: function(e) {
        if(e == 0)
            showNotifications('error','Something went wrong. Please, refresh the page and try again.');
        else if(e == 1)
            showNotifications('success','Client deleted successfully.');

          setTimeout(function(){
              window.location = baseurl+'admin/dashboard';
          },3000);
    }
  });
}

function updatePassword(){
let new_pass = $.trim($('input[name="new_pass"]').val());
let confirm_pass = $.trim($('input[name="confirm_pass"]').val());
if( new_pass != "" && new_pass == confirm_pass ){
  $.ajax({
    url: baseurl + 'home/profile', 
    type: "POST",             
    data: {'new_pass':new_pass},      
    success: function(e) {
        if(e == 0)
            showNotifications('error','Something went wrong. Please, refresh the page and try again.');
        else if(e == 1)
            showNotifications('success','Password updated successfully.');

          setTimeout(function(){
              window.location = baseurl+'home/profile';
          },3000);
    }
  });
}
else{
  showNotifications('error','Both password should match.');
}
}

function requestWithdrawal(){
let amount = $.trim($('#amount').val());
let available = $('#amount').data('available');
if( amount != 0 ){
  if(!isNaN(amount)){
    if( parseInt(amount) <= parseInt(available) ){
      $.ajax({
        url: baseurl + 'home/request_withdrawal', 
        type: "POST",             
        data: {'amount':amount , 'available':available},      
        success: function(e) {
            if(e == 0)
                showNotifications('error','Something went wrong. Please, refresh the page and try again.');
            else if(e == 1)
                showNotifications('success','Withdrawal Request has been sent successfully.');
  
              setTimeout(function(){
                  window.location = baseurl+'home/request_withdrawal';
              },3000);
        }
      });

    }
    else
      showNotifications('error','Please, enter amount, less than or equal to available amount.');
  }
  else
  showNotifications('error','Amount should be a number without symbol or comma.');
}
else
  showNotifications('error','Please, enter amount to proceed.');
}

function getWithdrawalStatus(_this){
let v = $(_this).text();
let dbid = $(_this).data('dbid');
$('.dropdown-clickable[data-dbid="'+dbid+'"]').text(v);
}

function saveWithdrawalStatus(wid){
$.ajax({
  url: baseurl + 'admin/saveWithdrawalStatus', 
  type: "POST",             
  data: {'status':$('.dropdown-clickable[data-dbid="'+wid+'"]').text() , 'wid' : wid},      
  success: function(e) {
      if(e == 0)
          showNotifications('error','Something went wrong. Please, refresh the page and try again.');
      else if(e == 1)
          showNotifications('success','Withdrawal status updated successfully.');

        setTimeout(function(){
            window.location = baseurl+'admin/withdrawalrequests/';
        },3000);
  }
});
}

function sendContactDetails(_this){
  let uname = $.trim($('#uname').val());
  let uemail = $.trim($('#uemail').val());
  let uphonenumber = $.trim($('#uphonenumber').val());
  let usubject = $.trim($('#usubject').val());
  let umessage = $.trim($('#umessage').val());

  if( uname != "" && uemail != "" && uphonenumber != "" && usubject != "" && umessage != "" ){
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(regex.test(uemail)){
      if(!isNaN(uphonenumber)){
        $(_this).text('...Sending');
        $.ajax({
          url: baseurl + 'home/sendContactDetails', 
          type: "POST",             
          data: {'uname' : uname , 'uemail' : uemail , 'uphonenumber' : uphonenumber , 'usubject' : usubject , 'umessage' : umessage },      
          success: function(e) {
              if(e == 0)
                  showNotifications('error','Something went wrong. Please, refresh the page and try again.');
              else if(e == 1)
                  showNotifications('success','Thankyou! for contacting us, We\'ll get back to you soon!');
        
                setTimeout(function(){
                    window.location = baseurl;
                },3000);
          }
        });
      }
      else
        showNotifications('error','Please enter a valid phone number, without spaces or special characters.');
    }
    else
      showNotifications('error','Please enter a valid email.');
  }
  else{
    showNotifications('error','All details are required.');
  }
}

$('#selectPlan').change(function(){
  let plan = $(this).val();
  if( plan != "" ){
    $.ajax({
      url: baseurl + 'admin/getUsersByPlans', 
      type: "POST",             
      data: {'planid':plan},      
      success: function(e) {
        $('option:selected').removeAttr("selected");
        if(e != 0){
          let data = JSON.parse(e);
          $('select[name="e_clientid[]"]').val(data);
          showNotifications('success',data.length + ' clients selected.');
        }
      }
    });
  } 
})