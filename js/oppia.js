$( document ).ready(function() {
	$('[name=reveal]').each(function(i){
		var revealSection = $(this).addClass('showmore revealed');
		var target = $('#answer'+$(this).attr('id'));

		function revealContent(){
			target.addClass('revealed');
			revealSection.removeClass('revealed');
		}

		target.addClass('showmore').show();
		if (revealSection.has('button').length > 0){
			
			revealSection.find('button').on('click', function(){
				inputValue = revealSection.find('input').eq(0).val();
				if (inputValue != null && inputValue != ''){ 
					revealContent(); 
				}
				else{
					var errorMsg = revealSection.find('.error-msg');
					if (errorMsg.length == 0){
						errorMsg = $('<div class="error-msg" style="display:none;">You have to enter some text.</div>');
						revealSection.append(errorMsg);
					}
					errorMsg.fadeIn();
				}
			});
		}		
		else{
			revealSection.on('click', revealContent);	
		}
		
	});

    // Slider functionality
    const slides =  document.querySelectorAll('slide');
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        let currentSlide = 0;
        slides[currentSlide].classList.add('active');
        const slide = document.querySelector('slide');
        const sliderContainer = slide.parentNode;
        const slideStyle = window.getComputedStyle(slide);
        const slideWidth = slide.offsetWidth + parseFloat(slideStyle.marginRight) + parseFloat(slideStyle.marginLeft);

        if (sliderContainer.getAttribute('pagination') === 'true') {
            const pagination = document.createElement('div');
            pagination.classList.add('pagination');
            for (let i = 0; i < totalSlides; i++) {
                const paginationItem = document.createElement('div');
                paginationItem.classList.add('pagination-item');
                pagination.appendChild(paginationItem);
            }
            sliderContainer.appendChild(pagination);

        }

        const paginationItems = document.querySelectorAll('.pagination-item');
        if (paginationItems.length > 0) {
            paginationItems[0].classList.add('active');
        }

        function changeSlide(direction) {
            currentSlide = Math.max(0, Math.min(currentSlide + direction, totalSlides - 1));

            slides[currentSlide].classList.add('active');
            if (direction > 0) {
                slides[currentSlide - 1].classList.remove('active');
            } else {
                slides[currentSlide + 1].classList.remove('active');
            }

            if (paginationItems.length > 0) {
                if (direction > 0) {
                    paginationItems[currentSlide].classList.add('active');
                } else {
                    paginationItems[currentSlide + 1].classList.remove('active');
                }
            }

            updateSlider();
        }

        function updateSlider() {
            sliderContainer.scroll({left: currentSlide * slideWidth, behavior: 'smooth'});
            updateButtonVisibility();

            console.log('currentSlide:', currentSlide);
            console.log('slideWidth:', slideWidth);
            console.log('Transform:', sliderContainer.style.transform);
            console.log('Slider Container Height:', sliderContainer.clientHeight);
        }

        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;

            deltaX = touchEndX - touchStartX;
            deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal Scroll
                if (deltaX < 0) {
                    console.log("swipe left");
                    changeSlide(1); // Swipe left
                } else {
                    console.log("swipe right");
                    changeSlide(-1); // Swipe right
                }
            }
        }

        sliderContainer.addEventListener('touchcancel', handleTouchEnd);
        sliderContainer.addEventListener('touchend', handleTouchEnd);

        if (sliderContainer) {

            const prevBtn = document.createElement('div');
            prevBtn.id = 'prevBtn';
            prevBtn.innerHTML = '&#10094;';
            prevBtn.addEventListener('touchstart', function () {
                changeSlide(-1);
            });
            sliderContainer.appendChild(prevBtn);

            const nextBtn = document.createElement('div');
            nextBtn.id = 'nextBtn';
            nextBtn.innerHTML = '&#10095;';
            nextBtn.addEventListener('touchstart', function () {
                changeSlide(1);
            });
            sliderContainer.appendChild(nextBtn);

            function updateButtonVisibility() {
                prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
                nextBtn.style.visibility = currentSlide === totalSlides - 1 ? 'hidden' : 'visible';
            }

            updateButtonVisibility();
        }
    }

    // Cards functionality
    const cards = document.querySelectorAll('card');
    if (cards.length > 0) {
        let currentCard = 0;
        cards[0].classList.add('active');
        cards[1].classList.add('next');

        $('card').on('click', function () {
            $('card').css({'pointer-events': 'none'});

            $('card.active').addClass('animate-leave');

            setTimeout(function () {
                $('card.animate-leave').addClass('animate-back').removeClass('animate-leave');
                $('card').parent().prepend($('.animate-back'));
                cards[currentCard].classList.remove('active');
                $('card.next').addClass('active').removeClass('next');
                currentCard = (currentCard + 1) % cards.length;

                const nextCard = cards[(currentCard + 1) % cards.length];
                nextCard.classList.add('next');
            }, 300);
            setTimeout(function () {
                $('card.animate-back').removeClass('animate-back');
                $('card').css({'pointer-events': 'auto'});
            }, 700);
        });
    }

    var knowMoreButtons = $('know-more item');
    if (knowMoreButtons.length){
        var modalFade = $('<div class="modal-fade"></div>').prependTo($('body')).hide();
        knowMoreButtons.find('modal').append('<div class="close"></div>').hide();


        knowMoreButtons.on('click', function(){
            var button = $(this);
            var modal = button.find('modal');

            var nextBtn = button.next().length ? button.next() : knowMoreButtons.first();
            knowMoreButtons.removeAttr('highlighted');
            nextBtn.attr('highlighted', true);

            modalFade.fadeIn(300);
            modal.show().on('click', function(event){
                event.stopPropagation();
                modal.hide();
                modalFade.fadeOut();
            });
        });
    }

    // Buttons functionality
    $('noora-button').on('click', function () {
        const clickedButton = $(this);

        if (clickedButton.attr('type') === 'modal') {

            return;
        }

        const color = clickedButton.attr('color');
        if (color === 'green'){
            clickedButton.attr('color', "pink");
        } else {
            clickedButton.attr('color', "green");
        }

        

    });

    //Audio Embed Functionality
    const audioPlayerContainer = document.getElementById('audio-player-container');
    if(audioPlayerContainer !== null) {
        const playIconContainer = document.getElementById('play-icon');
        const seekSlider = document.getElementById('seek-slider');
        let playState = 'play';

        playIconContainer.addEventListener('click', () => {
            if (playState === 'play') {
                playIconContainer.classList.remove('pause');
                playIconContainer.classList.add('play');
                audio.play();
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                playIconContainer.classList.remove('play');
                playIconContainer.classList.add('pause');
                audio.pause();
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        });

        const showRangeProgress = (rangeInput) => {
            if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        }

        seekSlider.addEventListener('input', (e) => {
            showRangeProgress(e.target);
        });


        /* Implementation of the functionality of the audio player */

        const audio = document.querySelector('audio');
        const durationContainer = document.getElementById('duration');
        let raf = null;

        const calculateTime = (secs) => {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        }

        const displayDuration = () => {
            durationContainer.textContent = calculateTime(audio.duration);
        }

        const setSliderMax = () => {
            seekSlider.max = Math.floor(audio.duration);
        }

        const displayBufferedAmount = () => {
            const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
            audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
        }

        const whilePlaying = () => {
            seekSlider.value = Math.floor(audio.currentTime);
            durationContainer.textContent = calculateTime(audio.duration - seekSlider.value);
            audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
            raf = requestAnimationFrame(whilePlaying);
        }

        if (audio.readyState > 0) {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        } else {
            audio.addEventListener('loadedmetadata', () => {
                displayDuration();
                setSliderMax();
                displayBufferedAmount();
            });
        }

        audio.addEventListener('progress', displayBufferedAmount);

        seekSlider.addEventListener('input', () => {
            durationContainer.textContent = calculateTime(audio.duration - seekSlider.value);
            if (!audio.paused) {
                cancelAnimationFrame(raf);
            }
        });

        seekSlider.addEventListener('change', () => {
            audio.currentTime = seekSlider.value;
            if (!audio.paused) {
                requestAnimationFrame(whilePlaying);
            }
        });
    }

});

function changeAudioSource(newSource) {
    var audioElement = document.querySelector('audio');
    if (audioElement) {
        audioElement.src = newSource + audioElement.src.replace('file:///audio/', '');
        audioElement.load();
    }
}