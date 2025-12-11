// هذا ملف JavaScript للتوب بار (اختياري)
console.log("تم تحميل التوب بار بنجاح");

// يمكنك إضافة وظائف إضافية هنا
document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', function() {
      alert('تم النقر على القائمة');
    });
  }
});
