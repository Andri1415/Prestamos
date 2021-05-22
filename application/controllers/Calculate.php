<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Calculate extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this
			->load
			->view('layout/header');
		$this
			->load
			->view('calculate');
		$this
			->load
			->view('layout/footer');
	}

	public function Save()
	{
		$capital = $this
			->input
			->post('capital');
		$amt_fees = $this
			->input
			->post('amt_fees');
		$freq = $this
			->input
			->post('freq');
		$s_date = $this
			->input
			->post('s_date');

		$this
			->CalculateModel
			->insert($capital, $amt_fees, $freq, $s_date);

		echo json_encode("Préstamo Insertado");
	}
}
