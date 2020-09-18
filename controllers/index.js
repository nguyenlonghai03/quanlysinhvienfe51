// Định nghĩa sự kiện khi người dùng click vào nút thêm sinh viên
// Gọi khi browser load

// Tạo ra mảng dữ liệu quản lý các sinh viên
var mangSinhVien = [];
var taoBang = function (arrSinhVien) {
  var contentTable = "";
  // Duyệt qua mảng sinh viên tạo ra các dòng tr
  for (var i = 0; i < arrSinhVien.length; i++) {
    // Mỗi lần duyệt lấy ra một đối tượng sinh viên từ trong mảng
    var sv = arrSinhVien[i];

    // Tạo đối tượng
    var sinhVien = new SinhVien(sv.maSinhVien, sv.tenSinhVien, sv.email, sv.diemToan, sv.diemHoa, sv.diemLy, sv.diemRenLuyen, sv.loaiSinhVien);
    // sinhVien.maSinhVien = sv.maSinhVien;
    // sinhVien.tenSinhVien = sv.tenSinhVien;
    // sinhVien.email = sv.email;
    // sinhVien.diemHoa = sv.diemHoa;
    // sinhVien.diemLy = sv.diemLy;
    // sinhVien.diemToan = sv.diemToan;
    // sinhVien.diemRenLuyen = sv.diemRenLuyen;
    // sinhVien.loaiSinhVien = sv.loaiSinhVien;

    // Tạo thẻ tr cộng dồn vào nội dung content table
    contentTable += `
        <tr>
            <td>${sinhVien.maSinhVien}</td>
            <td>${sinhVien.tenSinhVien}</td>
            <td>${sinhVien.email}</td>
            <td>${sinhVien.loaiSinhVien}</td>
            <td>${sinhVien.tinhDiemTrungBinh()}</td>
            <td>${sinhVien.diemRenLuyen}</td>
            <td><button class="btn btn-primary" onclick="chinhSuaSinhVien('${sinhVien.maSinhVien}')">Edit</button></td>
            <td><button class="btn btn-danger" onclick="xoaSinhVien('${
                sinhVien.maSinhVien
            }')">Xóa</button></td>
        </tr>
        `;
  }
  // log ra chuỗi nhiều thẻ tr vhuwas thông tin sinh viên
  document.getElementById("tblSinhVien").innerHTML = contentTable;
};
var chinhSuaSinhVien = function( maSV ) {
    // Khoas nuts chinh sua sinh vien
    document.getElementById('maSinhVien').disabled = true;
    console.log(maSV);
    // Tìm sinh viên có mã sv trong mảng
    for (var i = 0; i < mangSinhVien.length; i ++) {
        //mỗi lần duyệt lấy ra một sinh viên
        var sv = mangSinhVien[i];

        // kiểm tra từng sv xem sinh viên nào có mã bằng mã sinh viên khi click thì gán lên control phía trên
        if (sv.maSinhVien === maSV) {
            document.getElementById('maSinhVien').value = sv.maSinhVien;
            document.getElementById('tenSinhVien').value = sv.tenSinhVien;
            document.getElementById('diemToan').value = sv.diemToan;
            document.getElementById('diemLy').value = sv.diemLy;
            document.getElementById('diemHoa').value = sv.diemHoa;
            document.getElementById('email').value = sv.email;
            document.getElementById('diemRenLuyen').value = sv.diemRenLuyen;
            document.getElementById('loaiSinhVien').value = sv.loaiSinhVien;

        }
    }
    // Gán thông tin sinh viên tìm được lên các control (thẻ input) phía trên
}

// Xây dựng phương thức cập nhật sinh viên

document.getElementById('btnCapNhatSinhVien').onclick = function() {
    // Lấy thông tin người dùng nhập từ giao diện gán cho đối tượng sinh viên (sau khi người dùng đã thay đổi thông tin) => gán cho đối tượng sinh viên
    var svUpdate = new SinhVien();
    svUpdate.maSinhVien = document.getElementById('maSinhVien').value;
    svUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    svUpdate.email = document.getElementById('email').value;
    svUpdate.diemToan = document.getElementById('diemToan').value;
    svUpdate.diemLy = document.getElementById('diemLy').value;
    svUpdate.diemHoa = document.getElementById('diemHoa').value;
    svUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    svUpdate.loaiSinhVien = document.getElementById('loaiSinhVien').value;
    console.log(svUpdate);

    // Tìm svUpdate có mã trùng với maSV trong mảng => Gán dữ liệu sinh Vien đó = sv Update

    for (var i = 0; i < mangSinhVien.length; i ++) {
        var sv = mangSinhVien[i];

        if (sv.maSinhVien === svUpdate.maSinhVien) {
            sv.tenSinhVien = svUpdate.tenSinhVien;
            sv.email = svUpdate.email;
            sv.diemToan = svUpdate.diemToan;
            sv.diemLy = svUpdate.diemLy;
            sv.diemHoa = svUpdate.diemHoa;
            sv.diemRenLuyen = svUpdate.diemRenLuyen;
            sv.loaiSinhVien = svUpdate.loaiSinhVien;
        }
    }
    //Gọi hàm tạo lại bảng
    taoBang(mangSinhVien);
    luuLocalStorage();

    // Clear tất cả thông tin và bật lại input mã
    document.getElementById('maSinhVien').disabled = false;
    var mangTheInput = document.querySelectorAll('input');
    for (var i = 0; i < mangTheInput.length; i ++) {
        var tagInput = mangTheInput[i];

        // gán lại vale = roongt cho từng thẻ 1
        tagInput.value = '';
    }

}

var xoaSinhVien = function (maSV) {
  for (var i = mangSinhVien.length - 1; i >= 0; i--) {
    var sv = mangSinhVien[i];

    if (sv.maSinhVien === maSV) {
      mangSinhVien.splice(i, 1); //Hàm xóa phần tử của mảng trong js i: vị trí xóa, 1 là tại vị trí đó xóa 1 phần tử
    }
  }
  taoBang(mangSinhVien);
};

var validate = new Validation();

document.querySelector("#btnThemSinhVien").onclick = function () {
  // Tạo đối tượng lưu trữ thông tin người dùng
  var sv = new SinhVien();
  sv.maSinhVien = document.querySelector("#maSinhVien").value;
  sv.tenSinhVien = document.getElementById("tenSinhVien").value;
  sv.email = document.getElementById("email").value;
  sv.diemToan = document.getElementById("diemToan").value;
  sv.diemHoa = document.getElementById("diemHoa").value;
  sv.diemLy = document.getElementById("diemLy").value;
  sv.diemRenLuyen = document.getElementById("diemRenLuyen").value;
  sv.loaiSinhVien = document.getElementById("loaiSinhVien").value; //Nhớ xóa value rỗng của option

  //   Kiểm tra hợp lệ
  var valid = true;

  // Kiểm tra rỗng &= là cộng & chỉ cần có 1 thằng false thôi là return false
  valid &=
    validate.kiemTraRong(
      sv.maSinhVien,
      "Mã sinh viên",
      "#err_maSinhVien_ktRong"
    ) &
    validate.kiemTraRong(
      sv.tenSinhVien,
      "Tên sinh viên",
      "#err_tenSinhVien_ktRong"
    ) &
    validate.kiemTraRong(sv.email, "Email", "#err_email_ktRong") &
    validate.kiemTraRong(sv.diemToan, "Điểm toán", "#err_diemToan_ktRong") &
    validate.kiemTraRong(sv.diemLy, "Điểm lý", "#err_diemLy_ktRong") &
    validate.kiemTraRong(sv.diemHoa, "Điểm hóa", "#err_diemHoa_ktRong") &
    validate.kiemTraRong(
      sv.diemRenLuyen,
      "Điểm rèn luyện",
      "#err_diemRenLuyen_ktRong"
    );

  //Kiểm tra tất cả là ký tự
  valid &= validate.kiemTraChu(
    sv.tenSinhVien,
    "Tên sinh viên",
    "#err_tenSinhVien_allLetters"
  );

  valid &=
    validate.kiemTraTatCaSo(
      sv.maSinhVien,
      "Mã sinh viên",
      "#err_maSinhVien_allNumber"
    ) &
    validate.kiemTraTatCaSo(
      sv.diemToan,
      "Điểm toán",
      "#err_diemToan_allNumber"
    ) &
    validate.kiemTraTatCaSo(sv.diemLy, "Điểm lý", "#err_diemLy_allNumber") &
    validate.kiemTraTatCaSo(sv.diemHoa, "Điểm Hóa", "#err_diemHoa_allNumber") &
    validate.kiemTraTatCaSo(
      sv.diemRenLuyen,
      "Điểm rèn luyện",
      "#err_diemRenLuyen_allNumber"
    );

  // Kiểm tra email
  valid &= validate.kiemtraEmail(sv.email, "Email", "#err_email_format");

  // Kiểm tra độ dài
  valid &= validate.kiemTraDoDai(
    sv.maSinhVien,
    "Mã sinh viên",
    "#err_maSinhVien_maxMinLength",
    0,
    20
  );

  // kt giá trị
  valid &=
    validate.kiemTraGiaTri(
      sv.diemToan,
      "Điểm toán",
      "#err_diemToan_maxMinValue",
      1,
      10
    ) &
    validate.kiemTraGiaTri(
      sv.diemLy,
      "Điểm lý",
      "#err_diemLy_maxMinValue",
      1,
      10
    );

  if (!valid) {
    return;
  }

  mangSinhVien.push(sv);
  taoBang(mangSinhVien);

  luuLocalStorage();
};

var luuLocalStorage = function () {
  // Các bước lưu trữ mảng sinh viên xuống localstorage
  var sMangSinhVien = JSON.stringify(mangSinhVien); //Biến mảng sinh viên thành chuỗi
  console.log("sMangSinhVien", sMangSinhVien);
  console.log("mangSinhVien", mangSinhVien);

  localStorage.setItem('mangSinhVien', sMangSinhVien);
};

var layDuLieuLocalStorage = function() {
    
    // Kiểm tra dữ liệu có trong c=localstorage chưa
    if (localStorage.getItem('mangSinhVien')) {
        // Lấy một cái chuỗi từ local storage gán cho biến 
        //Lấy key và value của nó ở dạng chuỗi
        var sMangSinhVien = localStorage.getItem('mangSinhVien');

        // Biến đổi dữ liệu từ chuỗi JSON sang mảng
        mangSinhVien = JSON.parse(sMangSinhVien);
        //Gọi hàm tạo Bảng
        taoBang(mangSinhVien);
    }
}

layDuLieuLocalStorage();
