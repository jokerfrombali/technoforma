var TF_MAIL = 'sales@technoforma.ru';
var TF_OK = {
  ru: 'Спасибо! Заявка отправлена, менеджер свяжется с вами.',
  en: 'Thank you! Your request has been sent, our manager will contact you.',
  az: 'Təşəkkür edirik! Müraciətiniz göndərildi, menecer sizinlə əlaqə saxlayacaq.'
};
var TF_MAILTO = {
  ru: 'Сейчас откроется почтовая программа с готовым письмом — нажмите «Отправить».',
  en: 'Your mail app will open with a ready-made message — just press Send.',
  az: 'Hazır məktubla poçt proqramı açılacaq — «Göndər» düyməsini sıxın.'
};
function tfGoal(g) { try { if (window.ym) ym(103351565, 'reachGoal', g); } catch (e) {} }

document.querySelectorAll('form[data-goal]').forEach(function (f) {
  var p = f.querySelector('input[name=page]'); if (p) p.value = location.href;
  var lang = (f.querySelector('input[name=lang]') || {}).value || 'ru';
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = f.querySelector('button'); btn.disabled = true;
    var fd = new FormData(f);
    fetch(f.action, { method: 'POST', body: fd }).then(function (r) {
      if (!r.ok) throw 0;
      tfGoal('lead');
      f.innerHTML = '<p class="full"><b>' + TF_OK[lang] + '</b></p>';
    }).catch(function () {
      // обработчика нет (статическая копия) — отправка письмом
      var body = [];
      fd.forEach(function (v, k) { if (v) body.push(k + ': ' + v); });
      tfGoal('lead_mailto');
      var subj = (lang === 'ru' ? 'Заявка на расчёт с сайта' : lang === 'az' ? 'Saytdan hesablama sorğusu' : 'Quote request from website');
      location.href = 'mailto:' + TF_MAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body.join('\n'));
      f.innerHTML = '<p class="full"><b>' + TF_MAILTO[lang] + '</b></p>';
    });
  });
});
document.querySelectorAll('a[data-goal]').forEach(function (a) {
  a.addEventListener('click', function () { tfGoal(a.dataset.goal); });
});
