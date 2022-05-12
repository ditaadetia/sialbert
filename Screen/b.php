{{-- <?php
  use Carbon\Carbon;
  setlocale(LC_TIME, 'id_ID');
  \Carbon\Carbon::setLocale('id');
  \Carbon\Carbon::now()->formatLocalized("%A, %d %B %Y");
?>
{{-- <?php
// Skrip berikut ini adalah skrip yang bertugas untuk meng-export data tadi ke excell
header("Content-type: application/vnd-ms-excel");
header("Content-Disposition: attachment; filename=Daftar-Refund.xls");

?> --}}
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="Start your development with a Dashboard for Bootstrap 4.">
      <meta name="author" content="Creative Tim">
      <title>SI-ALBERT - UPTD Alat Berat PUPR Kota Pontianak</title>
      <!-- Icons -->
      <link rel="stylesheet" href="assets/vendor/nucleo/css/nucleo.css'" type="text/css">
      <!-- Page plugins -->
      <!-- Argon CSS -->
      <link rel="shortcut icon" type="image/x-icon" href="{{ asset('img/logo_pupr.jpeg') }}">
      <script type="text/javascript" src="assets/js/terbilang.js"></script>
      <style>
        .text-center {
          text-align: center;
        }
        table {
          width: 100%;
          color: #212121;
        }
        tr, td {
          padding: 8px!important;
        }
        .row {
          display: flex;
          margin-right: -15px;
          margin-left: -15px;
          flex-wrap: wrap;
        }
      </style>
      {{-- <link rel="stylesheet" href="assets/css/argon.css?v=1.2.0" type="text/css"> --}}
  <!-- jquery -->
  </head>
  <body>
    <center><h3 style="margin-bottom: 24px"><b>REKAPITULASI PENGEMBALIAN DANA</b></h3></center>
    <br>
    <table border="1">
      <thead>
        <tr align="center" style="text-align:center !important; vertical-align: middle !important; background-color:#FAD603">
          <td rowspan="1"><h6><b>NO.</b></h6></td>
          <td rowspan="1"><h6><b>KODE PEMESANAN</b></h6></td>
          <td rowspan="1"><h6><b>NAMA KEGIATAN</b></h6></td>
          <td rowspan="1"><h6><b>NAMA PERUSAHAAN</b></h6></td>
          <td rowspan="1"><h6><b>ALAMAT PERUSAHAAN</b></h6></td>
          <td rowspan="1"><h6><b>NAMA DIREKTUR</b></h6></td>
          <td rowspan="1"><h6><b>NO. KONTRAK</b></h6></td>
          <td colspan="1"><h6><b>TANGGAL KONTRAK</b></h6></td>
          <td rowspan="1"><h6><b>METODE PENGEMBALIAN DANA</b></h6></td>
          <td rowspan="1" width="15%"><h6><b>NAMA ALAT</b></h6></td>
          <td rowspan="1"><h6><b>JUMLAH HARI REFUND</b></h6></td>
          <td rowspan="1"><h6><b>JUMLAH JAM REFUND</b></h6></td>
          <td rowspan="1"><h6><b>JUMLAH REFUND</b></h6></td>
        </tr>
      </thead>
      <tbody class="list">
        <?php $no = 0 ?>
        @if($refund->count()>0)
          <?php $no++ ?>
          @foreach ($refund as $refund)
            <tr style="text-align:center !important; vertical-align: middle !important">
              <td class="no" valign="middle">
                {{ $no }}
              </td>
              <td valign="middle" style="margin-bottom: 80px !important">
                <b>ALB-{{ $refund->id }}</b>
              </td>
              <td>
                {{ $refund->nama_kegiatan }}
              </td>
              <td>
                {{ $refund->nama_instansi }}
              </td>
              <td>
                {{ $refund->alamat_instansi }}
              </td>
              <td>
                {{ $refund->nama }}
              </td>
              <td>
                <b>ALB-{{ $refund->id }}</b>
              </td>
              <td style="width: 145px;">
                {{ Carbon::parse($refund->created_at)->locale('id')->isoFormat('dddd, D MMMM YYYY') }}
              </td>
              <td>
                <b>{{ $refund->metode_refund }}</b>
              </td>
              <td>
                @foreach ($refund as $refund)
                  <ul type="none">
                    <li>
                      <b>{{ $refund->nama }}</b>
                    </li>
                  </ul>
                @endforeach
              </td>
              <td>
                @foreach ($refund as $refund)
                <ul type="none">
                  <li>
                    <b>{{ $refund->refund }}</b>
                  </li>
                </ul>
                @endforeach
              </td>
              <td>
                @foreach ($refund as $refund)
                <ul type="none">
                  <li>
                    <b>{{ $refund->refund }}</b>
                  </li>
                </ul>
                @endforeach
              </td>
              <td style="width: 130px;">
                <?php $total =0; ?>
                @foreach ($refund as $refund)
                  <?php
                    $jumlah = ($refund->harga_sewa_perhari * $refund->jumlah_hari_refund) + ($refund->harga_sewa_perjam * $detail_refund->jumlah_hari_refund);
                    $total = $total + $jumlah;
                  ?>
                @endforeach
                <b>{{ 'Rp. ' . number_format($total, 2, ",", ".") }}</b>
              </td>
            </tr>
          @endforeach
        @else
          <tr>
            <td colspan="13" style="text-align: center">
              Tidak ada data!
            </td>
          </tr>
        @endif
      </tbody>
    </table>
  </body>
</html> --}}