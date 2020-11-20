#!/bin/bash
pwd
. ./bert-server/venv/bin/activate
python3 manage.py run &
