var $ = require( "jquery" );
var social = function() {};
social.prototype = {
    share: function(network, shareData) {
        var t = $(this);
        var base_url = ($('script[data-baseurl]').attr('data-baseurl')) || '';
        if (shareData === '' || typeof shareData === 'undefined') {
            // Unable to determine double click isssue, so silencing error
            //console.error('[social][error] No shareData provided, cannot proceed', shareData);
            return false;
        }
        // Share Data
        var shareCopy = shareData.copy || '';
        var shareUrl = shareData.url || '';
        // if (shareUrl.indexOf('http') === -1) shareUrl = base_url + shareUrl;
        var hashTags = shareData.hashTags || '';
        var shareImg = '';
        if (shareData.img !== '' && typeof shareData.img !== 'undefined') {

            if (shareData.img.lastIndexOf('http://', 0) === 0) {
                shareImg = shareData.img;
            } else {
                shareImg = base_url + shareData.img;
            }
        } else {
            shareImg = '';
        }
        var shareTitle = shareData.title || ''; // facebook
        // Hashtag functions - appended into share copy
        if (network === 'twitter' || network === 'pinterest') {
            var charLimit = '';
            if (network === 'twitter') charLimit = 116;
            if (network === 'pinterest') charLimit = 500;
            var hashtagssplit = hashTags.trim().split(" ");
            hashtagssplit.forEach(function(e) {
                var newsharecopy = shareCopy + " " + e;
                if (newsharecopy.length <= charLimit) {
                    shareCopy += " " + e;
                }
            });
        }
        // We assume all requests must have a shareUrl
        if (shareCopy === '' && shareUrl === '') {
            console.warn('[social][error] There was no shareCopy or no shareUrl.', 'shareCopy : ' + shareCopy, 'shareUrl : ' + shareUrl);
            return false;
        }
        // quick check to ensure the share url isn't repeated in the share copy itself
        if (shareUrl) {
            shareCopy = shareCopy.replace(shareUrl, '');
        }
        // trim up any double spaces just in case
        shareCopy = $.trim(shareCopy).replace(/\s+/g, ' ');
        switch (network) {
            case "facebook":
                var data = {
                    method: 'feed',
                    link: shareUrl,
                    picture: shareImg,
                    name: shareTitle,
                    description: shareCopy
                };
                var callback = function callback(response) {};
                if (typeof FB !== 'undefined') {
                    FB.ui(data, callback);
                } else {
                    console.error('[social][error] FB is not defined, this ussually means there was an error trying tryign to init FB at page load, or you\'re tryign to run this from localhost.');
                }
                break;
            case "twitter":
                popupCenter('http://twitter.com/intent/tweet?text=' + encodeURIComponent(shareCopy) + '&url=' + encodeURIComponent(shareUrl), 590, 305);
                break;
            case "pinterest":
                popupCenter('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareUrl) + '&media=' + encodeURIComponent(shareImg) + '&description=' + encodeURIComponent(shareCopy), 780, 650);
                break;
            case "email":
                window.open(
                    'mailto:?subject=' + encodeURIComponent(shareData.subject) +
                    '&body=' + encodeURIComponent(shareData.message) + ' ' + encodeURIComponent(shareUrl)
                );
                break;
            case 'tumblr':
                window.open(
                    'http://www.tumblr.com/share/photo?source=' + encodeURIComponent(shareImg) +
                    '&caption=' + encodeURIComponent(shareCopy) +
                    '&canonicalUrl=' + encodeURIComponent(shareUrl)
                );
                break;
            default:
                console.warn('[social][error] No valid case for share network - did you provide the correct network in the .social() call?');
                return false;
        }
        // Event tracking
        t.trigger('share', network);
    }
};
if ($('#fb-root').length !== 0) console.error('[social][error] There appears to be multiple social scripts on this page : #fb-root already exists, remove any partials that might include markup with fb-root.');
function popupCenter(url, w, h) {
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, '', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus) {
        newWindow.focus();
    }
}
var fbinit = false;
var initFB = (function() {
    var host = $.trim(window.location.hostname.toLowerCase());
    var facebook_id = '';
    switch (host) {
        case 'inspiringyourstyle.com':
            facebook_id = '399166883867118';
        break;
        case 'www.inspiringyourstyle.com':
            facebook_id = '399166883867118';
        break;
        case 'stage.inspiringyourstyle.com':
            facebook_id = '1022149054590070';
        break;
        case 'stepupyourstyle.s3.amazonaws.com':
            facebook_id = '1024365624383199';
        break;
        case 'see.lbox.com':
            facebook_id = '161146384006282';
            break;
        case 'see.walmart.com':
            facebook_id = '281790795224383';
            break;
        case 'stage.lbox.com':
            facebook_id = '589334807798175';
            break;
        case 'dev.lbox.com':
            facebook_id = '795657473784531';
            break;
        case 'local.walmart.com':
            facebook_id = '428370040569035';
            break;
        case 'unileverpromo.com':
            facebook_id = '555494621148855';
            break;
        case 'apps.unileverpc.com':
            facebook_id = '789483994461818';
            break;
        case 'stage.apps.unileverpc.com':
            facebook_id = '789483994461818';
            break;
        case 'stage.mirumshopper.com':
            facebook_id = '419722998198061';
            break;
        case 'prod.mirumshopper.com':
            facebook_id = '753181978173191';
            break;            
        case 'localhost':
            console.warn('Facebook Init will not run from localhost.');
            return;
        default:
            console.error('[social][error] Your host (' + host + ') did not match a facebook ID. FB will not init.');
            return;
    }
    try {
        if (typeof(FB) !== 'undefined' && FB !== null) {
            fbinit = true;
            FB.init({
                appId: facebook_id,
                //channelUrl : self.channelUrl,
                status: true,
                cookie: true,
                xfbml: true,
                display: 'async'
            });
        }
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + facebook_id;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    } catch (error) {
        console.error("Facebook can not load at this time, error : ", error);
    }
}());
module.exports = social;
