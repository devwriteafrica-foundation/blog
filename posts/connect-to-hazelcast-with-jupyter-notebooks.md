---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-10-24' }
thumbnail: '/covers/connect-to-hazelcast-with-jupyter-notebooks.jpg'
type: [ 'Post' ]
slug: 'connect-to-hazelcast-with-jupyter-notebooks'
tags: [ 'Hazelcast' ,'Python','Jupyter Notebook' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'Connect to Hazelcast with Jupyter Notebooks'
status: [ 'Public' ]
createdTime: 'Mon Oct 24 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---
 
Jupyter Notebook is an open-source web tool that lets data scientists create and share documents with live code and equations.
Because of its interactivity and data presentation features, the Jupyter Notebook is considered a powerful tool for scientific projects. 
It also lets you use a web browser to edit and run notebook documents.
 
On the other hand, Hazelcast IMDG, is a Java-based open source in-memory data grid that lets you use a wide selection of massively scalable data structures in your Python applications. 
It takes advantage of the Hazelcast Near Cache functionality to save frequently read data in your Python projects, allowing you to access data faster in your applications.
Similarly, Hazelcast's IMDG Python client provides access to all data structures, distributed queues, and topics, as well as Javascript Object Notation (JSON) support.
 
In this tutorial, you'll be connecting to Hazelcast using Jupyter Notebooks with Python and SQL.
 
## Prerequisites
Before getting started with this tutorial, ensure you have the following;
- [Python 3.x](python.org/downloads/) installed on your computer.
- [OpenJDK ](https://openjdk.java.net/install/)installed
- [Hazelcast CLI ](https://docs.hazelcast.com/hazelcast/5.1/getting-started/get-started-cli)installed


## Installing Jupyter Notebook
To get started, we need to install and create a folder for this project. Open your terminal and run the command below:
 
```sh
mkdir hazelcast && cd hazelcast`
```
 
Then create and activate a virtual environment by running the following commands.
 
```sh
#install virtual env.
pip install virtualenv 
 
#create virtual env.
virtualenv env 
 
#activate env.
source env/bin/activate
```
 
If you see a similar output to the one in the screenshot below, your virtual environment has been successfully activated.
 
![Activating virtual environment](https://i.imgur.com/0t05cWr.png)
 
 
Now install and run the Jupyter notebook with the command below:
 
```sh
# install
pip install jupyter notebook
 
# run 
jupyter-notebook
```
 
The above command will install, run, and open the Jupyter notebook at port 8888 in your browser.
 
![Running Jupyter Notebook](https://i.imgur.com/QssTxPh.png)
 
Finally, you need to create a notebook and install the Hazelcast python client with Jupyter notebook. Click on the **New** tab at the top right corner of the Jupyter notebook on your browser, and select **Python 3 (ipykernel)**
 
![Creating a new Jupyter Notebook](https://i.imgur.com/K7fFClh.png)
 
You should have a new notebook opened on a new tab as shown on the screenshot below:
 
![A new Jupyter Notebook](https://i.imgur.com/VRB7T2I.png)
 
On the notebook cell copy and paste the code below and press **Run** to install the Hazelcast python client.
 
```sh
!pip install hazelcast-python-client[stats]
```
![Installing hazelcast-python-client](https://i.imgur.com/BU7IVn2.png)
 
 
 
## Creating a Hazelcast cluster
With the Jupyter notebook installed and set up, proceed to create a Hazelcast cluster for your application. To get started, you need to create a [free tire account](https://cloud.hazelcast.com/sign-up).
 
Once the sign-up is completed, you'll be redirected to the cluster page. Click the **CREATE NEW CLUSTER** button
 
![Sign in to hazelcast](https://i.imgur.com/noVfdlR.png)
 
Then you'll be redirected to the plans page where you'll be asked to choose your preferred plan. Go ahead and choose anyone that suits your project. But this tutorial uses the **Basic Free** plan.
 
Next, is the info page. Leave everything by default and hit the **CREATE FREE CLUSTER** button. 
 
![Creating a new hazelcast cluster](https://i.imgur.com/gbErwC2.png)
 
 
Lastly, you will be redirected to the Confirmation and Summary page. If are satisfied with the order depending on your use case, press the CONTINUE CREATING CLUSTER button.
 
![Confirming hazelcast cluster creation](https://i.imgur.com/kO1kob0.png)
 
At this point, your cluster should be created and ready to be used in your applications.
 
![hazelcast cluster preview](https://i.imgur.com/Iw6lmGp.png)

 
## Connecting  Cluster with Jupyter
Now to connect your Hazelcast cluster to your Python project, click on the  **CONNECT YOUR APPLICATION** button.
 
![Connecting to Jupyter Notebook cluster](https://i.imgur.com/PH7eC8a.png)
 
Then select **Python** from the select field at the top right-hand side of the page. Hazelcast will then provide you with instructions on how to download the zip file. Carefully follow the instructions to download and run the file.
 
Once you have tested the Hazelcast client cluster, let's connect your cluster to your Python application. On your Jupyter notebook, import hazelcast, and the logging module.
 
```python
import hazelcast
import logging
```
 
Then import your application to your Hazelcast cluster with the code snippet below;
 
```python
logging.basicConfig(level=logging.INFO)
client = hazelcast.HazelcastClient(
    cluster_name="<NAME>",
    cloud_discovery_token="<TOKEN>",
    statistics_enabled=True,
)
```
Replace `<NAME>` and `<TOKEN>` with your cluster name and discovery token. You can find them on the **Python Client Quick Setup** page in the **Python Client Advanced Setup** section.
 
![Setting up hazelcast Python client](https://i.imgur.com/nhg4CYx.png)
 

## Saving Data with SQL
 
To save data in your Hazelcast cluster using SQL, you need to create a [mapping](https://docs.hazelcast.com/hazelcast/5.0/sql/mapping-to-maps). To create city mapping for your cluster with the code snippet below.
 
```python
def run_sql_mapping(client):
    print("Creating a mapping...")
   
    mapping_query = "CREATE OR REPLACE MAPPING cities TYPE IMap " \
                    "OPTIONS ('keyFormat'='varchar','valueFormat'='varchar')"
    client.sql.execute(mapping_query).result()
    print("The mapping has been created successfully.")
    
```
 
Once your mapping has been created, you'll see a similar output to the one on the screenshot below on the cell.
 
![Mapping a new hazelcast cluster](https://i.imgur.com/qTlCBbN.png)
 
 
 
Next, update the **run_sql_mapping** function to insert a new record with the code snippet below;
 
```python
    print("Inserting data via SQL...")
    insert_query = """
    INSERT INTO cities VALUES
    ('Australia','Canberra'),
    ('Croatia','Zagreb'),
    ('Czech Republic','Prague'),
    ('England','London'),
    ('Turkey','Ankara'),
    ('United States','Washington, DC');
    """
    client.sql.execute(insert_query).result()
    print("The data has been inserted successfully.")
    print("--------------------")
```
In the above code snippet, we are inserting city data into the cities map. If you run the application, you will see the output below on your terminal.
 
![Inserting new records in hazelcast cluster](https://i.imgur.com/wezDPPT.png)
 
 
Lastly, update the **run_sql_mapping** function to retrieve the data you just created with the code snippet below.
 
```python
    print("Retrieving all the data via SQL...")
    result = hz_client.sql.execute("SELECT * FROM cities").result()
    for row in result:
        country = row[0]
        city = row[1]
        print("%s - %s" % (country, city))
    print("--------------------")
 
```
You should also see the output below when you run the application.
 
![Retrieving data from hazelcast cluster](https://i.imgur.com/Q7bAeKC.png)
 
To test it we need to call the **run_sql_mapping** and click the play button to run the application.
 
 
## Saving Data to Memory
Hazelcast provides many distributed data structures for writing data to memory on your cluster. A distributed map is one of the most commonly used methods for writing data to memory, which is duplicated and dispersed across a cluster and is stored as key/value pairs in maps. To get started, run the Hazelcast local cluster, with the command below:

```sh
hz start
```
If you see the output below, then your Hazelcast local cluster has successfully started.

![Started hazelcast local cluster](https://i.imgur.com/ih7uPoY.png)

Then, open another terminal tab and start the console with the command below;

```sh
hz-cli console
```

You should see the output below on your console. 
Now add the code below on your Jupyter cell to import, connect to the Hazelcast local cluster and create a mapping with the code snippet below.

```python
import hazelcast

client = hazelcast.HazelcastClient()
distributed_map = client.get_map("distributed-map")
```
Next, add some data to the cluster, fetch, and get the map size of the cluster with the code snippet below;

```python
//add some data
distributed_map.set("name", "John Doe").result()
distributed_map.set("age", "21").result()

//Get data
get_name = distributed_map.get("name")
get_age = distributed_map.get("age")

get_name.add_done_callback(lambda future: print(future.result()))
get_age.add_done_callback(lambda future: print(future.result()))

print("Map size:", distributed_map.size().result())

# Shutdown the client.
client.shutdown()
```

The **client.shoutdown ** will shut down the client once the operations have been performed. If you the application, you should see the output below.

![Shutting down a hazelcast cluster](https://i.imgur.com/2Kb3kE6.png)

 
## Conclusion
Throughout this tutorial, you've learned how easy and flexible it is to your Hazelcast cluster using Jupyter notes. We started with the introduction of both tools and created a demo application for the demonstrations. Now that you've gotten the knowledge you seek, how would use Hazelcast in your next Python project? Feel free to learn more about Hazelcast from the [official documentation](https://docs.hazelcast.com/home/).
 
