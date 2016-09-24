function looppagecurrentg(e) {
    var a = "";
    pageNumber = parseInt(numPages / 2), pageNumber == numPages - pageNumber && (numPages = 2 * pageNumber + 1), pageStart = currentPageNo - pageNumber, pageStart < 1 && (pageStart = 1), lastPageNo = parseInt(e / perPage) + 1, lastPageNo - 1 == e / perPage && (lastPageNo -= 1), pageEnd = pageStart + numPages - 1, pageEnd > lastPageNo && (pageEnd = lastPageNo), a += "<li class='pages'>Page " + currentPageNo + " of " + lastPageNo + "</li>";
    var t = parseInt(currentPageNo) - 1;
    currentPageNo > 1 && (a += "page" == currentPage ? '<li class="showpage firstpage"><a href="' + home_page + '">' + firstText + "</a></li>" : '<li class="firstpage"><a href="/search/label/' + postLabel + "?&max-results=" + perPage + '">' + firstText + "</a></li>"), currentPageNo > 2 && (a += 3 == currentPageNo ? "page" == currentPage ? '<li class="showpage"><a href="' + home_page + '">' + prevText + "</a></li>" : '<li><a href="/search/label/' + postLabel + "?&max-results=" + perPage + '">' + prevText + "</a></li>" : "page" == currentPage ? '<li><a href="#" onclick="redirectpage(' + t + ');return false">' + prevText + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + t + ');return false">' + prevText + "</a></li>"), pageStart > 1 && (a += "page" == currentPage ? '<li><a href="' + home_page + '">1</a></li>' : '<li><a href="/search/label/' + postLabel + "?&max-results=" + perPage + '">1</a></li>');
    for (var r = pageStart; r <= pageEnd; r++) a += currentPageNo == r ? '<li class="active"><a href="#">' + r + "</a></li>" : 1 == r ? "page" == currentPage ? '<li><a href="' + home_page + '">1</a></li>' : '<li><a href="/search/label/' + postLabel + "?&max-results=" + perPage + '">1</a></li>' : "page" == currentPage ? '<li><a href="#" onclick="redirectpage(' + r + ');return false">' + r + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + r + ');return false">' + r + "</a></li>";
    pageEnd < lastPageNo && (a += "page" == currentPage ? '<li><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + "</a></li>");
    var l = parseInt(currentPageNo) + 1;
    currentPageNo < lastPageNo - 1 && (a += "page" == currentPage ? '<li><a href="#" onclick="redirectpage(' + l + ');return false">' + nextText + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + l + ');return false">' + nextText + "</a></li>"), currentPageNo < lastPageNo && (a += "page" == currentPage ? '<li class="lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + "</a></li>" : '<li class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + "</a></li>");
    for (var s = document.getElementsByName("pageArea"), n = document.getElementById("blog-pager"), g = 0; g < s.length; g++) s[g].innerHTML = a;
    s && s.length > 0 && (a = ""), n && (n.innerHTML = a)
}

function totalcountdata(e) {
    var a = e.feed,
        t = parseInt(a.openSearch$totalResults.$t, 10);
    looppagecurrentg(t)
}

function pagecurrentg() {
    var e = urlactivepage; - 1 != e.indexOf("/search/label/") && (postLabel = -1 != e.indexOf("?updated-max") ? e.substring(e.indexOf("/search/label/") + 14, e.indexOf("?updated-max")) : e.substring(e.indexOf("/search/label/") + 14, e.indexOf("?&max"))), -1 == e.indexOf("?q=") && -1 == e.indexOf(".html") && (-1 == e.indexOf("/search/label/") ? (currentPage = "page", currentPageNo = -1 != urlactivepage.indexOf("#PageNo=") ? urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1, document.write('<script src="' + home_page + 'feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata"></script>')) : (currentPage = "label", -1 == e.indexOf("&max-results=") && (perPage = 20), currentPageNo = -1 != urlactivepage.indexOf("#PageNo=") ? urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1, document.write('<script src="' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1" ></script>')))
}

function redirectpage(e) {
    jsonstart = (e - 1) * perPage, noPage = e;
    var a = document.getElementsByTagName("head")[0],
        t = document.createElement("script");
    t.type = "text/javascript", t.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost"), a.appendChild(t)
}

function redirectlabel(e) {
    jsonstart = (e - 1) * perPage, noPage = e;
    var a = document.getElementsByTagName("head")[0],
        t = document.createElement("script");
    t.type = "text/javascript", t.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost"), a.appendChild(t)
}

function finddatepost(e) {
    post = e.feed.entry[0];
    var a = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29),
        t = encodeURIComponent(a);
    if ("page" == currentPage) var r = "/search?updated-max=" + t + "&max-results=" + perPage + "#PageNo=" + noPage;
    else var r = "/search/label/" + postLabel + "?updated-max=" + t + "&max-results=" + perPage + "#PageNo=" + noPage;
    location.href = r
}
"undefined" == typeof firstText && (firstText = "First"), "undefined" == typeof lastText && (lastText = "Last");
var noPage, currentPage, currentPageNo, postLabel;
pagecurrentg();
