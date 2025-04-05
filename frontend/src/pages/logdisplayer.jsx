import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import './logdisplayer.css'; 

const LogDisplayer = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: '',
    apiEndpoint: '',
    statusCode: '',
    startTime: '',
    endTime: '',
    isFailure: '',
    errorMessage: ''
  });

  // Sample data - in a real app, you'd fetch this from your backend
  useEffect(() => {
  

    const sampleLogs = [
     
        {
          "timestamp": "2023-10-01T00:00:15",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 155,
          "client_ip": "14.56.201.128",
          "user_agent": "Mozilla/5.0 (Macintosh; PPC Mac OS X 10_12_2; rv:1.9.3.20) Gecko/3014-02-22 14:31:30 Firefox/3.8",
          "bytes_sent": 2325,
          "correlation_id": "trace-15f31ac5-e079-45a7-a4f9-71bff26416cd",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "21ba567f-41d7-44d7-856b-b79b0c2b0c18",
            "product_id": 498
          },
          "server_metrics": {
            "cpu_usage": "50%",
            "memory_usage": "50%"
          },
          "retry_count": 0,
          "service_version": "v2.1.0",
          "platform": "AWS",
          "geolocation": {
            "country": "USA",
            "region": "Indiana"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:00:25",
          "api_endpoint": "/cart/add",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 457,
          "client_ip": "191.202.238.102",
          "user_agent": "Opera/9.44.(Windows NT 5.2; sa-IN) Presto/2.9.168 Version/12.00",
          "bytes_sent": 4516,
          "correlation_id": "trace-01ae5670-caea-4c61-9e34-6dc3a2445267",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "bece6e5a-553c-4790-8d1f-8c5b18b3213d",
            "product_id": 192
          },
          "server_metrics": {
            "cpu_usage": "31%",
            "memory_usage": "67%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "AWS",
          "geolocation": {
            "country": "India",
            "region": "Kansas"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:00:28",
          "api_endpoint": "/inventory/status",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 434,
          "client_ip": "75.75.166.239",
          "user_agent": "Mozilla/5.0 (iPod; U; CPU iPhone OS 3_2 like Mac OS X; om-KE) AppleWebKit/531.6.5 (KHTML, like Gecko) Version/3.0.5 Mobile/8B112 Safari/6531.6.5",
          "bytes_sent": 1008,
          "correlation_id": "trace-6c0e2715-cddc-4260-a4e1-df97f0d2b850",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "50b2a6c0-db87-4593-8643-aed148ce00fe",
            "product_id": 153
          },
          "server_metrics": {
            "cpu_usage": "52%",
            "memory_usage": "80%"
          },
          "retry_count": 0,
          "service_version": "v2.1.0",
          "platform": "AWS",
          "geolocation": {
            "country": "Brazil",
            "region": "Alabama"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:00:36",
          "api_endpoint": "/cart/add",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 358,
          "client_ip": "160.243.168.81",
          "user_agent": "Opera/9.25.(X11; Linux x86_64; shs-CA) Presto/2.9.186 Version/10.00",
          "bytes_sent": 4284,
          "correlation_id": "trace-8a7ee83a-9338-4b48-84e6-9f630ea1cf4a",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "5e35e48c-fa34-495c-8a3b-64f3a6c3fab0",
            "product_id": 18
          },
          "server_metrics": {
            "cpu_usage": "43%",
            "memory_usage": "53%"
          },
          "retry_count": 0,
          "service_version": "v2.0.0",
          "platform": "AWS",
          "geolocation": {
            "country": "USA",
            "region": "Iowa"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:00:40",
          "api_endpoint": "/auth/login",
          "http_method": "GET",
          "status_code": 500,
          "response_time_ms": 4532,
          "client_ip": "35.19.184.73",
          "user_agent": "Mozilla/5.0 (iPad; CPU iPad OS 17_3 like Mac OS X) AppleWebKit/533.0 (KHTML, like Gecko) FxiOS/11.3f7804.0 Mobile/21Q257 Safari/533.0",
          "bytes_sent": 1022,
          "correlation_id": "trace-930a99dd-02ac-4235-9c91-24f18f8b8c0b",
          "downstream_apis": [],
          "error_message": "Authentication failed",
          "request_params": {
            "user_id": "deb42a7a-478d-4ebc-85c7-c10a3760ca68",
            "product_id": 196
          },
          "server_metrics": {
            "cpu_usage": "39%",
            "memory_usage": "66%"
          },
          "retry_count": 1,
          "service_version": "v2.0.0",
          "platform": "AWS",
          "geolocation": {
            "country": "India",
            "region": "Arkansas"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:00:45",
          "api_endpoint": "/checkout",
          "http_method": "POST",
          "status_code": 500,
          "response_time_ms": 3871,
          "client_ip": "84.173.46.254",
          "user_agent": "Mozilla/5.0 (iPod; U; CPU iPhone OS 4_0 like Mac OS X; lb-LU) AppleWebKit/533.42.7 (KHTML, like Gecko) Version/4.0.5 Mobile/8B117 Safari/6533.42.7",
          "bytes_sent": 175,
          "correlation_id": "trace-4b02f2fc-48e2-4c97-b40b-78af253afb2e",
          "downstream_apis": ["/payment/process", "/inventory/status"],
          "error_message": "Database connection error",
          "request_params": {
            "user_id": "198d6b01-b305-4790-9270-f2a9336ffd84",
            "product_id": 367
          },
          "server_metrics": {
            "cpu_usage": "78%",
            "memory_usage": "67%"
          },
          "retry_count": 3,
          "service_version": "v2.1.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "India",
            "region": "Rhode Island"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:00:46",
          "api_endpoint": "/inventory/status",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 362,
          "client_ip": "75.21.105.191",
          "user_agent": "Mozilla/5.0 (X11; Linux i686; rv:1.9.7.20) Gecko/9387-07-15 02:34:30 Firefox/3.8",
          "bytes_sent": 2854,
          "correlation_id": "trace-7650c92c-82e3-435d-8046-c7efa98171d2",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "02962d22-7aca-40b1-969c-17174a2dc2e0",
            "product_id": 419
          },
          "server_metrics": {
            "cpu_usage": "32%",
            "memory_usage": "70%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "India",
            "region": "Iowa"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:00:54",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 227,
          "client_ip": "184.33.162.216",
          "user_agent": "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_6_1; rv:1.9.4.20) Gecko/4645-07-30 05:35:18 Firefox/3.6.7",
          "bytes_sent": 958,
          "correlation_id": "trace-3432cc38-8955-4ea6-be22-6efeca04b4af",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "03b45f1c-3d0b-4d8a-83de-bf3eba8ffe14",
            "product_id": 36
          },
          "server_metrics": {
            "cpu_usage": "52%",
            "memory_usage": "42%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "USA",
            "region": "South Carolina"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:01:03",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 437,
          "client_ip": "163.235.179.113",
          "user_agent": "Mozilla/5.0 (Linux; Android 2.2.2) AppleWebKit/534.1 (KHTML, like Gecko) Chrome/46.0.845.0 Safari/534.1",
          "bytes_sent": 3628,
          "correlation_id": "trace-62c31a72-0c14-4868-a269-1f5a6c1d49f2",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "f05debaf-ae85-4b01-bee9-aa6a85c52bbc",
            "product_id": 424
          },
          "server_metrics": {
            "cpu_usage": "36%",
            "memory_usage": "59%"
          },
          "retry_count": 0,
          "service_version": "v2.0.0",
          "platform": "Azure",
          "geolocation": {
            "country": "Japan",
            "region": "Indiana"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:01:11",
          "api_endpoint": "/checkout",
          "http_method": "POST",
          "status_code": 500,
          "response_time_ms": 3895,
          "client_ip": "5.177.23.95",
          "user_agent": "Mozilla/5.0 (X11; Linux i686; rv:1.9.7.20) Gecko/8691-08-22 00:51:51 Firefox/3.6.3",
          "bytes_sent": 2279,
          "correlation_id": "trace-8835ea91-6f4b-42f1-a63e-198f196ca7b3",
          "downstream_apis": ["/payment/process", "/inventory/status"],
          "error_message": "Invalid request parameters",
          "request_params": {
            "user_id": "db60c2db-76a4-4ba8-b5ce-1ba2621a1c44",
            "product_id": 402
          },
          "server_metrics": {
            "cpu_usage": "62%",
            "memory_usage": "53%"
          },
          "retry_count": 1,
          "service_version": "v2.1.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "USA",
            "region": "Michigan"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:01:12",
          "api_endpoint": "/checkout",
          "http_method": "POST",
          "status_code": 500,
          "response_time_ms": 4299,
          "client_ip": "79.88.138.213",
          "user_agent": "Mozilla/5.0 (compatible; MSIE 5.0; Windows 98; Win 9x 4.90; Trident/4.1)",
          "bytes_sent": 4224,
          "correlation_id": "trace-d8569a03-3f21-4191-813a-2f719225ebe6",
          "downstream_apis": ["/payment/process", "/inventory/status"],
          "error_message": "Rate limit exceeded",
          "request_params": {
            "user_id": "68409c8a-e415-4ae1-9fa7-c1f76cafb5e8",
            "product_id": 322
          },
          "server_metrics": {
            "cpu_usage": "38%",
            "memory_usage": "69%"
          },
          "retry_count": 1,
          "service_version": "v2.0.0",
          "platform": "AWS",
          "geolocation": {
            "country": "India",
            "region": "South Carolina"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:01:15",
          "api_endpoint": "/cart/add",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 302,
          "client_ip": "106.49.134.224",
          "user_agent": "Mozilla/5.0 (Macintosh; PPC Mac OS X 10_5_4 rv:5.0; mai-IN) AppleWebKit/531.6.7 (KHTML, like Gecko) Version/4.0.3 Safari/531.6.7",
          "bytes_sent": 1322,
          "correlation_id": "trace-6baa79c3-0894-41f2-81b4-e0f1b2d1e15a",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "1fb806e2-4f88-4978-8f14-868f5da793f6",
            "product_id": 21
          },
          "server_metrics": {
            "cpu_usage": "54%",
            "memory_usage": "76%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "India",
            "region": "Wyoming"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:01:20",
          "api_endpoint": "/cart/add",
          "http_method": "GET",
          "status_code": 500,
          "response_time_ms": 3495,
          "client_ip": "51.201.235.90",
          "user_agent": "Mozilla/5.0 (Windows; U; Windows NT 4.0) AppleWebKit/532.45.2 (KHTML, like Gecko) Version/4.0.3 Safari/532.45.2",
          "bytes_sent": 2821,
          "correlation_id": "trace-051be443-6276-40da-8332-dcc5cdaa9eee",
          "downstream_apis": [],
          "error_message": "Service unavailable",
          "request_params": {
            "user_id": "9e6fdd90-be87-448e-8346-9cd72544586d",
            "product_id": 30
          },
          "server_metrics": {
            "cpu_usage": "79%",
            "memory_usage": "76%"
          },
          "retry_count": 0,
          "service_version": "v2.0.0",
          "platform": "Azure",
          "geolocation": {
            "country": "India",
            "region": "Kansas"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:01:23",
          "api_endpoint": "/payment/process",
          "http_method": "GET",
          "status_code": 500,
          "response_time_ms": 352,
          "client_ip": "10.5.153.236",
          "user_agent": "Mozilla/5.0 (Windows 98; Win 9x 4.90) AppleWebKit/533.1 (KHTML, like Gecko) Chrome/48.0.861.0 Safari/533.1",
          "bytes_sent": 2312,
          "correlation_id": "trace-b9074b0f-5bbc-41d2-8fe5-9d43b2e08252",
          "downstream_apis": [],
          "error_message": "Internal server error",
          "request_params": {
            "user_id": "d0aaf84e-7849-4fbb-baa5-d6f42d4d61be",
            "product_id": 316
          },
          "server_metrics": {
            "cpu_usage": "50%",
            "memory_usage": "54%"
          },
          "retry_count": 2,
          "service_version": "v2.0.0",
          "platform": "AWS",
          "geolocation": {
            "country": "India",
            "region": "Kansas"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:01:33",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 132,
          "client_ip": "194.87.55.94",
          "user_agent": "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_11_4 rv:2.0; ve-ZA) AppleWebKit/532.40.5 (KHTML, like Gecko) Version/5.0.5 Safari/532.40.5",
          "bytes_sent": 4347,
          "correlation_id": "trace-d1e0c257-a5e7-4cfc-a8e0-9b6447301b89",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "540daea7-3595-40a8-9cc1-8b4fa4fd192d",
            "product_id": 436
          },
          "server_metrics": {
            "cpu_usage": "43%",
            "memory_usage": "35%"
          },
          "retry_count": 0,
          "service_version": "v2.1.0",
          "platform": "AWS",
          "geolocation": {
            "country": "USA",
            "region": "Alaska"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:01:39",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 119,
          "client_ip": "97.171.211.80",
          "user_agent": "Mozilla/5.0 (Linux; Android 2.2.2) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/54.0.898.0 Safari/535.2",
          "bytes_sent": 2271,
          "correlation_id": "trace-2beea197-2a05-4289-a561-710a7a57ec87",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "ab10b0bc-8cb5-445b-8ca1-bdf4ef9546a7",
            "product_id": 297
          },
          "server_metrics": {
            "cpu_usage": "32%",
            "memory_usage": "64%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "Azure",
          "geolocation": {
            "country": "India",
            "region": "Delaware"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:01:47",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 198,
          "client_ip": "54.167.4.168",
          "user_agent": "Mozilla/5.0 (Windows NT 11.0) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/15.0.820.0 Safari/532.0",
          "bytes_sent": 559,
          "correlation_id": "trace-637f078e-06bd-4d47-9134-e286794d10b5",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "df676554-c407-4da0-986c-3f90b14803a3",
            "product_id": 386
          },
          "server_metrics": {
            "cpu_usage": "38%",
            "memory_usage": "49%"
          },
          "retry_count": 0,
          "service_version": "v2.1.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "India",
            "region": "Mississippi"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:01:51",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 500,
          "response_time_ms": 4332,
          "client_ip": "218.216.192.42",
          "user_agent": "Opera/9.60.(Windows 98; Win 9x 4.90; csb-PL) Presto/2.9.160 Version/10.00",
          "bytes_sent": 381,
          "correlation_id": "trace-f120acda-9080-4e27-91e6-6b22c38e002b",
          "downstream_apis": [],
          "error_message": "Insufficient inventory",
          "request_params": {
            "user_id": "bf168cd1-7cb7-476a-8733-6ffd81dd2baf",
            "product_id": 15
          },
          "server_metrics": {
            "cpu_usage": "59%",
            "memory_usage": "50%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "USA",
            "region": "Alaska"
          },
          "is_failure": 1
        },
        {
          "timestamp": "2023-10-01T00:02:01",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 226,
          "client_ip": "217.150.10.237",
          "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_4) AppleWebKit/536.1 (KHTML, like Gecko) Chrome/53.0.845.0 Safari/536.1",
          "bytes_sent": 838,
          "correlation_id": "trace-4648f499-66e6-4ad9-81b4-a602ea409f7c",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "9a260010-d8bf-4be4-8469-42b7f51e2d7c",
            "product_id": 271
          },
          "server_metrics": {
            "cpu_usage": "23%",
            "memory_usage": "34%"
          },
          "retry_count": 0,
          "service_version": "v1.2.0",
          "platform": "Azure",
          "geolocation": {
            "country": "USA",
            "region": "North Dakota"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:02:10",
          "api_endpoint": "/payment/process",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 367,
          "client_ip": "197.220.235.184",
          "user_agent": "Mozilla/5.0 (Android 2.0.1; Mobile; rv:34.0) Gecko/34.0 Firefox/34.0",
          "bytes_sent": 2345,
          "correlation_id": "trace-3915a408-bc32-4be1-9b27-f24b401a4860",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "80584408-5e2f-4fb7-bf3a-8cf7543ffb5d",
            "product_id": 494
          },
          "server_metrics": {
            "cpu_usage": "20%",
            "memory_usage": "38%"
          },
          "retry_count": 0,
          "service_version": "v2.1.0",
          "platform": "AWS",
          "geolocation": {
            "country": "Germany",
            "region": "Massachusetts"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:02:20",
          "api_endpoint": "/cart/add",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 258,
          "client_ip": "60.226.108.79",
          "user_agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_10_2) AppleWebKit/532.2 (KHTML, like Gecko) Chrome/26.0.892.0 Safari/532.2",
          "bytes_sent": 2616,
          "correlation_id": "trace-b3fc922d-ab10-4fe6-b6a1-ed7f46002b2b",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "9a731d02-7e71-47c1-b568-7cbdc1d39a3e",
            "product_id": 299
          },
          "server_metrics": {
            "cpu_usage": "22%",
            "memory_usage": "65%"
          },
          "retry_count": 0,
          "service_version": "v2.1.0",
          "platform": "AWS",
          "geolocation": {
            "country": "USA",
            "region": "New Hampshire"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:02:29",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 200,
          "response_time_ms": 438,
          "client_ip": "24.216.129.86",
          "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_6 like Mac OS X) AppleWebKit/531.2 (KHTML, like Gecko) FxiOS/11.7d3069.0 Mobile/60T162 Safari/531.2",
          "bytes_sent": 1216,
          "correlation_id": "trace-daab1ae4-53e2-42b4-9cdb-08d5ae2b4884",
          "downstream_apis": [],
          "error_message": null,
          "request_params": {
            "user_id": "9233b6ea-3da0-43bd-b4aa-87d6b05cb7da",
            "product_id": 258
          },
          "server_metrics": {
            "cpu_usage": "54%",
            "memory_usage": "32%"
          },
          "retry_count": 0,
          "service_version": "v2.0.0",
          "platform": "On-Premise",
          "geolocation": {
            "country": "India",
            "region": "Pennsylvania"
          },
          "is_failure": 0
        },
        {
          "timestamp": "2023-10-01T00:02:32",
          "api_endpoint": "/product/{id}",
          "http_method": "GET",
          "status_code": 500,
          "response_time_ms": 3666,
          "client_ip": "33.77.150.59",
          "user_agent": "Opera/9.57.(Windows NT 4.0; hne-IN) Presto/2.9.167 Version/11.00",
          "bytes_sent": 3013,
          "correlation_id": "trace-933cdc87-512b-4e46-a424-76ec7e4398f5",
          "downstream_apis": [],
          "error_message": "Invalid API key",
          "request_params": {
            "user_id": "38740b72-8ee8-431c-80f9-64e6dcb4c6d8",
            "product_id": 127
          },
          "server_metrics": {
            "cpu_usage": "26%",
            "memory_usage": "65%"
          },
          "retry_count": 3,
          "service_version": "v1.2.0",
          "platform": "Azure",
          "geolocation": {
            "country": "Brazil",
            "region": "Alabama"
          },
          "is_failure": 1
        },
    ];
    
    setLogs(sampleLogs);
    setFilteredLogs(sampleLogs);
    setLoading(false);
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...logs];
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(log => 
        Object.values(log).some(val => 
          String(val).toLowerCase().includes(term)
      ));
    }
    
    if (filters.apiEndpoint) {
      result = result.filter(log => 
        log.api_endpoint === filters.apiEndpoint
      );
    }
    
    if (filters.statusCode) {
      result = result.filter(log => 
        String(log.status_code) === filters.statusCode
      );
    }
    
    if (filters.startTime) {
      result = result.filter(log => 
        new Date(log.timestamp) >= new Date(filters.startTime)
      );
    }
    
    if (filters.endTime) {
      result = result.filter(log => 
        new Date(log.timestamp) <= new Date(filters.endTime)
      );
    }
    
    if (filters.isFailure !== '') {
      result = result.filter(log => 
        log.is_failure === (filters.isFailure === 'true' ? 1 : 0)
      );
    }
    
    if (filters.errorMessage) {
      const errorTerm = filters.errorMessage.toLowerCase();
      result = result.filter(log => 
        log.error_message && log.error_message.toLowerCase().includes(errorTerm)
      );
    }
    
    setFilteredLogs(result);
  }, [logs, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      apiEndpoint: '',
      statusCode: '',
      startTime: '',
      endTime: '',
      isFailure: '',
      errorMessage: ''
    });
  };

  // Extract unique values for dropdowns
  const uniqueApiEndpoints = [...new Set(logs.map(log => log.api_endpoint))];
  const uniqueStatusCodes = [...new Set(logs.map(log => log.status_code))];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Log Explorer</h1>
        <div className="header-actions">
          <span className="last-updated">
            Last updated: {format(new Date(), 'PPpp')}
          </span>
        </div>
      </header>
      
      <div className="main-content">
        <aside className="sidebar">
          <div className="filter-section">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Search logs..."
              />
            </div>
            
            <div className="filter-group">
              <label>API Endpoint</label>
              <select
                name="apiEndpoint"
                value={filters.apiEndpoint}
                onChange={handleFilterChange}
              >
                <option value="">All Endpoints</option>
                {uniqueApiEndpoints.map(endpoint => (
                  <option key={endpoint} value={endpoint}>
                    {endpoint}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status Code</label>
              <select
                name="statusCode"
                value={filters.statusCode}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                {uniqueStatusCodes.map(code => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Error Message</label>
              <input
                type="text"
                name="errorMessage"
                value={filters.errorMessage}
                onChange={handleFilterChange}
                placeholder="Filter by error message..."
              />
            </div>
            
            <div className="filter-group">
              <label>Time Range</label>
              <div className="time-range">
                <input
                  type="datetime-local"
                  name="startTime"
                  value={filters.startTime}
                  onChange={handleFilterChange}
                  placeholder="Start time"
                />
                <input
                  type="datetime-local"
                  name="endTime"
                  value={filters.endTime}
                  onChange={handleFilterChange}
                  placeholder="End time"
                />
              </div>
            </div>
            
            <div className="filter-group">
              <label>Failure Status</label>
              <select
                name="isFailure"
                value={filters.isFailure}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="true">Failures Only</option>
                <option value="false">Success Only</option>
              </select>
            </div>
            
            <button onClick={clearFilters} className="clear-btn">
              Clear Filters
            </button>
          </div>
          
          <div className="stats-section">
            <h3>Statistics</h3>
            <div className="stat-item">
              <span>Total Logs</span>
              <span className="stat-value">{logs.length}</span>
            </div>
            <div className="stat-item">
              <span>Filtered Logs</span>
              <span className="stat-value">{filteredLogs.length}</span>
            </div>
            <div className="stat-item">
              <span>Success Rate</span>
              <span className="stat-value">
                {logs.length > 0 
                  ? `${Math.round((logs.filter(l => !l.is_failure).length / logs.length) * 100)}%` 
                  : '0%'}
              </span>
            </div>
            <div className="stat-item">
              <span>Errors</span>
              <span className="stat-value">
                {logs.filter(l => l.error_message).length}
              </span>
            </div>
          </div>
        </aside>
        
        <main className="log-viewer">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <div>Loading logs...</div>
            </div>
          ) : (
            <LogTable logs={filteredLogs} />
          )}
        </main>
      </div>
    </div>
  );
};

const LogTable = ({ logs }) => {
  const [expandedLog, setExpandedLog] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'descending'
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedLogs = React.useMemo(() => {
    let sortableLogs = [...logs];
    if (sortConfig.key) {
      sortableLogs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLogs;
  }, [logs, sortConfig]);

  const toggleExpand = (logId) => {
    if (expandedLog === logId) {
      setExpandedLog(null);
    } else {
      setExpandedLog(logId);
    }
  };

  // Helper function to render complex object fields
  const renderLogValue = (key, value) => {
    if (value === null) return <span className="null-value">null</span>;
    
    if (Array.isArray(value)) {
      return (
        <div className="array-value">
          {value.map((item, index) => (
            <div key={index} className="array-item">
              {typeof item === 'object' ? JSON.stringify(item) : item}
            </div>
          ))}
        </div>
      );
    }
    
    if (typeof value === 'object') {
      return <pre>{JSON.stringify(value, null, 2)}</pre>;
    }

    // Special formatting for certain fields
    if (key === 'error_message' && value) {
      return <span className="error-message">{value}</span>;
    }
    
    return value;
  };

  return (
    <div className="log-table-container">
      <div className="table-header">
        <div className="results-count">
          Showing {logs.length} log{logs.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {logs.length === 0 ? (
        <div className="no-logs">
          No logs match your current filters
        </div>
      ) : (
        <table className="log-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('timestamp')}>
                Timestamp
                {sortConfig.key === 'timestamp' && (
                  <span className="sort-arrow">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort('api_endpoint')}>
                API Endpoint
                {sortConfig.key === 'api_endpoint' && (
                  <span className="sort-arrow">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort('http_method')}>
                Method
                {sortConfig.key === 'http_method' && (
                  <span className="sort-arrow">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort('status_code')}>
                Status
                {sortConfig.key === 'status_code' && (
                  <span className="sort-arrow">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort('response_time_ms')}>
                Response Time
                {sortConfig.key === 'response_time_ms' && (
                  <span className="sort-arrow">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map(log => (
              <React.Fragment key={log.correlation_id}>
                <tr className={log.is_failure ? 'error-row' : ''}>
                  <td>{format(parseISO(log.timestamp), 'MMM d, yyyy HH:mm:ss')}</td>
                  <td>{log.api_endpoint}</td>
                  <td>
                    <span className={`method-badge ${log.http_method.toLowerCase()}`}>
                      {log.http_method}
                    </span>
                  </td>
                  <td>
                    <span className={`status-code ${log.status_code >= 500 ? 'error' : log.status_code >= 400 ? 'warning' : 'success'}`}>
                      {log.status_code}
                    </span>
                  </td>
                  <td>
                    <div className="response-time">
                      <div 
                        className={`time-bar ${log.response_time_ms > 1000 ? 'slow' : log.response_time_ms > 300 ? 'medium' : 'fast'}`}
                        style={{ width: `${Math.min(100, log.response_time_ms / 20)}%` }}
                      ></div>
                      <span>{log.response_time_ms}ms</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => toggleExpand(log.correlation_id)}
                      className="expand-btn"
                      aria-label={expandedLog === log.correlation_id ? "Collapse details" : "Expand details"}
                    >
                      {expandedLog === log.correlation_id ? '▲' : '▼'}
                    </button>
                  </td>
                </tr>
                {expandedLog === log.correlation_id && (
                  <tr className="expanded-row">
                    <td colSpan="6">
                      <div className="expanded-content">
                        <div className="detail-grid">
                          {Object.entries(log).map(([key, value]) => {
                            // Skip fields already displayed in the main row
                            if (['timestamp', 'api_endpoint', 'http_method', 'status_code', 'response_time_ms'].includes(key)) {
                              return null;
                            }
                            
                            return (
                              <div key={key} className="detail-item">
                                <span className="detail-label">{key.replace(/_/g, ' ')}:</span>
                                <div className="detail-value">
                                  {renderLogValue(key, value)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="detail-actions">
                          <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(log, null, 2))}>
                            Copy JSON
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogDisplayer;