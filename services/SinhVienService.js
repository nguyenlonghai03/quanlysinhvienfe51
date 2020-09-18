var SinhVienService = function() {
    // Phương thức giao tiếp backend qua api => lấy thông tin sinh viên từ server về
    this.layDanhSachSinhVien = function() {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
            method: 'GET'
        });
        return promise;
    }
    this.xoaSinhVien = function( maSinhVien ) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,
            method: 'DELETE'
        })
        return promise; 
    }
    this.layThongTinSinhVien = function( maSinhVien ) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
            method: 'GET'
        })
        return promise; 
    }
    // Gửi cả 1 đối tượng sinh viên vào
    this.capNhatThongTinSinhVien = function( maSinhVien, sinhVienUpdate ) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${maSinhVien}`,
            method: 'PUT',
            data: sinhVienUpdate
        })
        return promise;
    }
}