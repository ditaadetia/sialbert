<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Resources\OrderResource;
use App\Http\Resources\DetailOrderResource;
use Carbon\CarbonPeriod;
use DateTime;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class OrderController extends Controller
{
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         "tenant_id" => ['required'],
    //         "category_order_id" => ['required'],
    //         // "nama_instansi" => ['required'],
    //         // "jabatan" => ['required'],
    //         // "nama_bidang_hukum" => ['required'],
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(
    //             $validator->errors(),
    //             HttpFoundationResponse::HTTP_UNPROCESSABLE_ENTITY
    //         );
    //     }

    //     try {
    //         $order = Order::create($request->all());

    //         $response = [
    //             'message' => 'Berhasil disimpan',
    //             'data' => $order,
    //         ];

    //         return response()->json($response, HttpFoundationResponse::HTTP_CREATED);
    //     } catch (QueryException $e) {
    //         return response()->json([
    //             'message' => "Gagal " . $e->errorInfo,
    //         ]);
    //     }
    // }

    public function index()
    {
        $tenants = DB::table('orders')->get();

        $data=[];
        foreach ($tenants as $tenant){
            $awal=date_create($tenant->tanggal_mulai);
            $akhir=date_create($tenant->tanggal_selesai);
            $t_awal = new DateTime($tenant->tanggal_mulai);
            $t_awal = $t_awal->modify('+1 day');
            $t_akhir = new DateTime($tenant->tanggal_selesai);
            $t_akhir = $t_akhir->modify('+1 day');
            $period = CarbonPeriod::create($t_awal, $t_akhir);
            $tes = date('Y-m-d', strtotime($period));
            $diff=date_diff($awal, $akhir);
            foreach($period as $date){
                $month = $date->format('Y-m-d');
            }
            $data[]= [
                'id' => $tenant->id,
                'nama_instansi' => $tenant->nama_instansi,
                'created_at' => $tenant->created_at,
                'month' => $period,
                'color'=> "#ffd700",
                'tanggal_mulai' => date('Y-m-d', strtotime($tenant->tanggal_mulai)),
                'tanggal_selesai' => date('Y-m-d', strtotime($tenant->tanggal_selesai)),
                'total_hari'=>$diff->days,
                'total_jam'=>$diff->h,
                'ket_verif_admin' => $tenant->ket_verif_admin,
                'ket_persetujuan_kepala_uptd' => $tenant->ket_persetujuan_kepala_uptd,
                'ket_persetujuan_kepala_dinas' => $tenant->ket_persetujuan_kepala_dinas,
                'alat' =>
                    $equipments = DB::table('orders')
                    ->join('detail_orders', 'detail_orders.order_id', '=', 'orders.id')
                    ->join('equipments', 'detail_orders.equipment_id', '=', 'equipments.id')
                    ->select('detail_orders.id','equipments.nama', 'equipments.foto', 'equipments.harga_sewa_perhari', 'equipments.harga_sewa_perjam')
                    ->where('detail_orders.order_id', $tenant->id)
                    ->get()
            ];
        }
        return response()->json($data);
        // $tenants = DB::table('equipments')->whereBetween('id', [1, 7])->orWhere('nama', 'Lainnya')->get();
        // return response()->json($tenants);
    }

    public function downloadDokumenSewa($id)
    {
        $model_file =Order::findOrFail($id); //Mencari model atau objek yang dicari
        $dokumen_sewa = trim($model_file->dokumen_sewa, 'dokumen_sewa/');
        $file = public_path() . '/storage/dokumen_sewa/dokumen_sewa_' . $dokumen_sewa;//Mencari file dari model yang sudah dicari
        return response()->download($file, $dokumen_sewa); //Download file yang dicari berdasarkan nama file
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'tenant_id' => 'required|integer',
            'category_order_id' => 'required|integer',
            'nama_instansi' => 'string|max:255',
            'jabatan' => 'string|max:255',
            'alamat_instansi' => 'string',
            'nama_kegiatan' => 'required|string|max:255',
            'ktp' => 'file|max:2048|mimes:png,jpg,jpeg',
            'surat_permohonan' => 'file|max:2048|mimes:png,jpg,jpeg',
            'akta_notaris' => 'file|max:2048|mimes:png,jpg,jpeg',
            'surat_ket' => 'file|max:2048|mimes:png,jpg,jpeg',
            'tanggal_mulai' => 'required|date|max:255',
            'tanggal_selesai' => 'required|date|max:255',
        ]);

        // if($validator->fails()){
        //     return response()->json($validator->errors());
        // }

        // $order = Order::create([
        //     'tenant_id' => $request->tenant_id,
        //     'category_order_id' => $request->category_order_id,
        //     'nama_instansi' => $request->nama_instansi,
        //     'jabatan' => $request->jabatan,
        //     'alamat_instansi' => $request->alamat_instansi,
        //     'nama_kegiatan' => $request->nama_kegiatan,
        //     'ktp' => $request->ktp,
        //     'surat_permohonan' => $request->surat_permohonan,
        //     'akta_notaris' => $request->akta_notaris,
        //     'surat_ket' => $request->surat_ket,
        //     'tanggal_mulai' => $request->tanggal_mulai,
        //     'tanggal_selesai' => $request->tanggal_selesai,
        // ]);

        $result = DB::transaction(function () use ($validator, $request) {
            if ($request->hasFile('ktp')) {
                // store the 'foto' into the 'public' disk
                $validator['ktp'] = $request->file('ktp')->store('ktp', 'public');
            }
            if ($request->hasFile('surat_permohonan')) {
                // store the 'foto' into the 'public' disk
                $validator['surat_permohonan'] = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
            }
            if ($request->hasFile('akta_notaris')) {
                // store the 'foto' into the 'public' disk
                $validator['akta_notaris'] = $request->file('akta_notaris')->store('akta_notaris', 'public');
            }
            if ($request->hasFile('surat_ket')) {
                // store the 'foto' into the 'public' disk
                $validator['surat_ket'] = $request->file('surat_ket')->store('surat_ket', 'public');
            }
            return Order::create($validator);
        });

        return response()->json(['Program created successfully.', new OrderResource($result)]);
        // if ($result){
        // }
    }
}
