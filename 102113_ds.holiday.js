// JavaScript Document

$(document).ready(function() {
	var pageQty = 9;
	var curPage = 1;
	var scrollDistance = new Array();
	scrollDistance = [1152, 973, 994, 1017, 718, 724, 744, 705, 700];
	var scrollPreset = new Array();
	scrollPreset = [0, -1152, -2125, -3119, -4136, -4854, -5578, -6322, -7027];
	var viewHeight = 700;
	var scrollHeight = 7727;
	var scrollPosition = 0;
	
	var scrollSpeed = 1.2;
	
	//Store starting pos for each slide
	$('.fcSlide').each(function(n){
		$(this).data({ startY : $(this).css('top'), h : $(this).height()});
	});
	
	
	//UP DOWN ARROWS
	$('.fcArrow').bind('mouseover', function(){
		TweenMax.to($('img', this), .3, {autoAlpha:1});
	}).bind('mouseleave', function(){
		TweenMax.to($('img', this), .3, {autoAlpha:0});
	});
	
	$('#fcArrowUp').bind('click', function(){
		curPage--;
		if(curPage == 0){
			curPage = pageQty;
		}
		updateToc();
		$('.fcSlide').each(function(){
			var p = $(this).offset();
			var pr = $(this).position();
			if(p.top >= (viewHeight * 2)){
				$(this).css('top', pr.top - scrollHeight);
			}
		});
		scrollPosition = scrollPosition + scrollDistance[curPage - 1];
		scrollIt();
	});
			
	$('#fcArrowDown').bind('click', function(){
		$('#fcArrowUp').show();
		scrollPosition = scrollPosition - scrollDistance[curPage - 1];
		curPage++;
		if(curPage > pageQty){
			curPage = 1;
		}
		updateToc();
		
		$('.fcSlide').each(function(){
			var p = $(this).offset();
			var pr = $(this).position();
			if(p.top <= -(viewHeight * 2)){
				$(this).css('top', pr.top + scrollHeight);
			}
		});
		scrollIt();
	});
	
	
	function scrollIt(){
		if($('.turnedOn').length != 0){
			$('.turnedOn').trigger('click');
		}
		TweenMax.to($('#fcTocOn'), scrollSpeed, {top: (36 * (curPage-1)) + 'px', ease:Power2.easeInOut});
		TweenMax.to($('#fcScroll'), scrollSpeed, {top:scrollPosition, ease:Power2.easeInOut});
	}
	
	
	//TOC
	$('#fcToc1').addClass('activeToc');
	
	$('.fcTocItem').each(function(n){
			$(this).data('curToc', n+1)
	});
	
	$('.fcTocItem').bind('mouseover', function(){
		if(!$(this).hasClass('activeToc')){
			$(this).css('background-position', function(i, backgroundPosition) {
			    return backgroundPosition.replace(/\d+px/, '-30px');
			});
		}
	}).bind('mouseleave', function(){
		if(!$(this).hasClass('activeToc')){
			$(this).css('background-position', function(i, backgroundPosition) {
			    return backgroundPosition.replace(/\d+px/, '0px');
			});
		}
	}).bind('click', function(){
		if(!$(this).hasClass('activeToc')){
			$('.activeToc').css('background-position', function(i, backgroundPosition) {
			    return backgroundPosition.replace(/\d+px/, '0px');
			}).removeClass('activeToc');
			$(this).addClass('activeToc');
			$('#fcArrowTop').show();
			TweenMax.set($('#fcScroll'), {top:scrollPreset[curPage - 1]});
			$('.fcSlide').each(function(){
				TweenMax.set($(this), {top : $(this).data('startY')});
			});
			curPage = $(this).data('curToc');
			scrollPosition = scrollPreset[curPage - 1];
			scrollIt();
		}
	});
	
	
	function updateToc(){
		$('.activeToc').css('background-position', function(i, backgroundPosition) {
		    return backgroundPosition.replace(/\d+px/, '0px');
		}).removeClass('activeToc');
		$('#fcToc' + curPage).css('background-position', function(i, backgroundPosition) {
		    return backgroundPosition.replace(/\d+px/, '-30px');
		}).addClass('activeToc');
	}
	
	//Slide 1 Explore button
	$('#fcS1Explore').click(function(){
		$('#fcArrowDown').trigger('click');
	});
	
	
	//===============================
	
	//CTA's
	$('.fcCTAPlus').each(function(n){
			$(this).data('curCTA', n+1)
	}).bind('mouseover', function(){
		TweenMax.to($('#CTA' + $(this).data('curCTA')), .3, {autoAlpha:1, overwrite:1});
	}).bind('mouseleave', function(){
		TweenMax.to($('#CTA' + $(this).data('curCTA')), .3, {autoAlpha:0, delay:.01});
	});
	
	$('.fcCTA').bind('mouseover', function(){
		TweenMax.to($(this), .3, {autoAlpha:1, overwrite:1});
	}).bind('mouseleave', function(){
		TweenMax.to($(this), .3, {autoAlpha:0, delay:.01});
	});

	$('.fcSlide9RO').bind('mouseover', function(){
		TweenMax.to($('img', this), .2, {autoAlpha:1});
	}).bind('mouseleave', function(){
		TweenMax.to($('img', this), .2, {autoAlpha:0});
	});
	
	
	
	window.onload = function(){
		$('#fcLoader').fadeOut(300);
	}
	//====================================================================
	$('img').bind('dragstart', function(event) {
		event.preventDefault()
	});//stops page hilighting
	
	$('img').mousedown(function(e) {
		e.preventDefault();
	});
	$('.fcUseMap').focus(function(){//GETS RID OF THE BLUE OUTLINES!
			$(this).blur();
	});
});