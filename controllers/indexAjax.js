// console.log(axios);
// Nhớ hỏi cv, câu hỏi react

// Tạo ra một Object chứa các thông tin be cung cấp

// var objectGetSinhVien = {
//     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //đường dẫn backend cung cấp để lấy hoặc thêm dữ liệu
//     method: 'GET' //Giao thức backend cung cấp
// }
// Hàm axios kết nối tới backend
//Dùng thư viện axios gửi yêu cầu đến sever
//Đối tượng chứa kq trả về la promise vì trả về có thể đúng hoặc sai

// Khai báo service
var svService = new SinhVienService();
var layThongTinSinhVien = function () {
    var promise = svService.layDanhSachSinhVien(); // Trả về 1 cái promise với method GET

    promise.then(function (result) {
            
            var content = "";
            // Từ dữ liệu tạo table
            for (var i = 0; i < result.data.length; i++) {
                var sv = result.data[i]; //Lấy ra từng sinh viên từ kết quả sever trả về

                // Tạo đối tượng sinh viên chứa dữ liệu đó
                var sinhVien = new SinhVien();
                // Bên phải là dữ liệu của backend, bên trái là tạo ra đối tượng cùng thuộc tính để chứa dữ liệu đó
                sinhVien.maSinhVien = sv.maSinhVien;
                sinhVien.tenSinhVien = sv.tenSinhVien;
                sinhVien.email = sv.email;
                sinhVien.loaiSinhVien = sv.loaiSinhVien;
                sinhVien.diemRenLuyen = sv.diemRenLuyen;
                sinhVien.diemToan = sv.diemToan;
                sinhVien.diemLy = sv.diemLy;
                sinhVien.diemHoa = sv.diemHoa;

                content += `<tr>
            <td>${sinhVien.maSinhVien}</td>
            <td>${sinhVien.tenSinhVien}</td>
            <td>${sinhVien.email}</td>
            <td>${sinhVien.loaiSinhVien}</td>
            <td>${sinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
            <td>${sinhVien.diemRenLuyen}</td>
            <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xóa</button><button class="btn btn-primary ml-1" onclick="chinhSua('${sv.maSinhVien}')">Chinh Sua</button></td>
        </tr>`;
            }
            document.getElementById("tblSinhVien").innerHTML = content;
            // console.log(2);
        })
        .catch(function (err) {
            console.log(err.response.data);
        });
};
layThongTinSinhVien();


//===========POST: chức năng thêm sinh viên vào server
document.getElementById("btnThemSinhVien").onclick = function () {
    // Lấy thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.getElementById("maSinhVien").value;
    sv.tenSinhVien = document.getElementById("tenSinhVien").value;
    sv.email = document.getElementById("email").value;
    sv.diemToan = document.getElementById("diemToan").value;
    sv.diemLy = document.getElementById("diemLy").value;
    sv.diemHoa = document.getElementById("diemHoa").value;
    sv.diemRenLuyen = document.getElementById("diemRenLuyen").value;
    sv.loaiSinhVien = document.getElementById("loaiSinhVien").value;

    console.log("sinhVien", sv);

    // Tạo ra obj backend cần
    // var obj = {
    //     "maSinhVien": sv.maSinhVien,
    //     "tenSinhVien": "string",
    //     "loaiSinhVien": "string",
    //     "diemToan": 0,
    //     "diemLy": 0,
    //     "diemHoa": 0,
    //     "diemRenLuyen": 0,
    //     "email": "string"
    //   }
    axios({
        url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
        method: "POST",
        data: sv, //Theo định dangk BE yêu cầu,l data tự đưa lên theo be
        // sv này là một obj có key trùng với key của backend
        // Vì key của sv vô tình trùng với key của data backend nên không cần tạo ra obj có key giống với key backend nữa
    }).then(function (result) {
        console.log("Kết quả", result.data);
        //location.reload => load lại file script => gọi api danh sách sinh viên mới về lại
        // location.reload();
        layThongTinSinhVien();

        //Cách 2: Gọi lại api layDanhSachSinhVien Tại đây
    })
        .catch(function (err) {
            console.log("Kết quả", err.response.data);
        });
};

var xoaSinhVien = function( maSinhVien ) {
    var promise = svService.xoaSinhVien(maSinhVien); //Trả 1 cái promise 
    promise.then(function( result ) {
        // Load lại api lấy thông tin sinh viên
        layThongTinSinhVien();
    }).catch(function( err ) {
        console.log(err.response.data);
    });
}

var chinhSua = function( maSinhVien ) {
    var promise = svService.layThongTinSinhVien(maSinhVien);
    promise.then(function( result ) {
        // Lấy về thành công gán dữ liệu lên thẻ input
        console.log(result.data);
        var sinhVien = result.data;
        document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
        document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
        document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;
        document.getElementById('diemToan').value = sinhVien.diemToan;
        document.getElementById('diemLy').value = sinhVien.diemLy;
        document.getElementById('diemHoa').value = sinhVien.diemHoa;
        document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.getElementById('email').value = sinhVien.email;

    }).catch(function( err ) {
        console.log(err.response.data);
    })
}


document.getElementById('btnCapNhatSinhVien').onclick = function() {
    var sinhVienUpdate = new SinhVien();
    sinhVienUpdate.maSinhVien = document.getElementById('maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    sinhVienUpdate.email = document.getElementById('email').value;
    sinhVienUpdate.diemToan = document.getElementById('diemToan').value;
    sinhVienUpdate.diemLy = document.getElementById('diemLy').value;
    sinhVienUpdate.diemHoa = document.getElementById('diemHoa').value;
    sinhVienUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sinhVienUpdate.loaiSinhVien = document.getElementById('loaiSinhVien').value;

    // Gọi api cập nhật sinh viên từ backend cung cấp
    var promise = svService.capNhatThongTinSinhVien( sinhVienUpdate.maSinhVien, sinhVienUpdate );
    promise.then(function( result ) {
        console.log('Haine');
        console.log(result);

        // Xử lý khi cập nhật thành công
        layThongTinSinhVien();
    }).catch(function( err ) {
        console.log(err.response.data);
    })
}

// var promise = axios({
//     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
//     method: 'GET'
// });

//Hứa thì có thể thành công hoặc thất bại
//Gửi request tới backend trả về promise có thể thành công hoặc thất bại
// axios là hàm bất đồng bộ, không tuân theo quy tắc, khi gửi request tới backend nó sẽ đợi và thực hiện sau nên số 2 sẽ ra sau số 1 đợi riêng làm gì làm khi xong r chạy vào mấy cái hàm tronga axios (bất đồng bộ)
// var layDuLieuThanhCong = function( result ) { //Hàm xử lý khi kq trả về thành c

// }

// var layDuLieuThatBai = function ( err ) {
//     console.log(err.response.data);
// }
// Nhận vào tham số là 1 cái hàm
// Phương thức .then (callback): nhận vào 1 hàm có 1 tham số là kết quả trả về thành công từ phía sever (trả về dữ liệu)
// Phương thức .catch (callback): nhận vào 1 hàm có tham số là kết quả trả về thất bại từ phía sever (trả lỗi)

// promise.then(layDuLieuThanhCong).catch(layDuLieuThatBai);

// console.log(1);
