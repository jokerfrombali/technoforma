document.querySelectorAll('form[data-goal]').forEach(function (f) {
  var p = f.querySelector('input[name=page]'); if (p) p.value = location.pathname;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = f.querySelector('button'); btn.disabled = true;
    fetch(f.action, { method: 'POST', body: new FormData(f) }).then(function (r) {
      if (!r.ok) throw 0;
      if (window.ym) ym(103351565, 'reachGoal', 'lead');
      f.innerHTML = '<p class="full"><b>Спасибо! Заявка отправлена. / Thank you! / Təşəkkür edirik!</b></p>';
    }).catch(function () {
      btn.disabled = false;
      alert('Не удалось отправить. Позвоните 8 (800) 550-51-98 или напишите sales@technoforma.ru');
    });
  });
});
document.querySelectorAll('a[data-goal]').forEach(function (a) {
  a.addEventListener('click', function () { if (window.ym) ym(103351565, 'reachGoal', a.dataset.goal); });
});
