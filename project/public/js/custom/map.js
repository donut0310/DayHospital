// var mapContainer = document.querySelector('.map');
// //var mobile_mapContainer = document.querySelector('.mobile_main_map');

// var options = {
//     center: new kakao.maps.LatLng(37.657607, 127.045947),
//     level: 3
// };

// var map = new kakao.maps.Map(mapContainer, options);
// //var mobile_map = new kakao.maps.Map(mobile_mapContainer,options);
// // 마커가 표시될 위치입니다 
// var markerPosition  = new kakao.maps.LatLng(37.657607, 127.045947); 

// // 마커를 생성합니다
// var marker = new kakao.maps.Marker({
//     position: markerPosition
// });

// // 마커가 지도 위에 표시되도록 설정합니다
// marker.setMap(map);
// //marker.setMap(mobile_map);

// // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// // marker.setMap(null); 
// // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
// var iwContent = '<div style="padding:8px;">성모사랑센터</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

// // 인포윈도우를 생성합니다
// var infowindow = new kakao.maps.InfoWindow({
//     content : iwContent
// });

// // 마커에 마우스오버 이벤트를 등록합니다
// kakao.maps.event.addListener(marker, 'mouseover', function() {
//   // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
//     infowindow.open(map, marker);
// });

// // 마커에 마우스아웃 이벤트를 등록합니다
// kakao.maps.event.addListener(marker, 'mouseout', function() {
//     // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
//     infowindow.close();
// });

var mapOptions = {
    center : new naver.maps.LatLng(37.657607, 127.045947),
    zoom : 10
};

var map = new naver.maps.Map('map',mapOptions);